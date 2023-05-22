import Bottleneck from "bottleneck";
import { getBounds, getDistance } from "geolib";
import wretch from "wretch";

const DEBUG = true;

function makePoint(latitude, longitude) {
  return { latitude, longitude };
}

function fetchOSMData(query) {
  const url = new URL("https://overpass-api.de/api/interpreter");
  url.searchParams.set("data", query);

  return wretch(url.toString()).get().json();
}

async function fetchElevations(locations) {
  return await wretch("https://api.open-elevation.com/api/v1/lookup")
    .headers({ Accept: "application/json", "Content-Type": "application/json" })
    .json({ locations })
    .post()
    .json();
}

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});

const makeEleKey = (lat, lon) => `[${lat.toFixed(6)},${lon.toFixed(6)}]`;

async function fetchElevationData({ elements }) {
  const elevationMap = {};

  if (DEBUG) {
    for (const e of elements) {
      if (e.type !== "node") continue;

      elevationMap[makeEleKey(e.lat, e.lon)] = Math.floor(Math.random() * 20 + 30);
    }

    return elevationMap;
  }

  const elevationQueries = [];
  const WINDOW = 2000;
  let queryIndex = -1;
  for (const e of elements) {
    if (e.type === "node") {
      if (queryIndex === -1 || elevationQueries[queryIndex].length >= WINDOW) {
        queryIndex++;
        elevationQueries[queryIndex] = [];
      }

      elevationQueries[queryIndex].push(makePoint(e.lat, e.lon));
    }
  }

  for (const query of elevationQueries) {
    const { results } = await limiter.schedule(() => fetchElevations(query));
    for (const { longitude, latitude, elevation } of results) {
      const key = makeEleKey(latitude, longitude);

      elevationMap[key] = elevation;
    }
  }

  return elevationMap;
}

export default async function fetchPathData(startCoords, endCoords) {
  const { minLat, minLng, maxLat, maxLng } = getBounds([startCoords, endCoords]);
  const query = `
    [out:json][bbox:${minLat},${minLng},${maxLat},${maxLng}];
    (
      way["highway"];
      way["route"];
      way["path"];
    );
    (._;>;);
    out;`;

  const osmResult = await fetchOSMData(query);

  const elevationMap = await fetchElevationData(osmResult);

  const nodes = {},
    ways = [];

  let startNodeId, endNodeId;
  let bestStartDist = Infinity,
    bestEndDist = Infinity;

  for (const e of osmResult.elements) {
    if (e.type === "node") {
      const { lat, lon } = e;
      const eleKey = makeEleKey(lat, lon);

      const distToStart = getDistance(startCoords, e);
      if (distToStart < bestStartDist) {
        bestStartDist = distToStart;
        startNodeId = e.id;
      }

      const distToEnd = getDistance(endCoords, e);
      if (distToEnd < bestEndDist) {
        bestEndDist = distToEnd;
        endNodeId = e.id;
      }

      nodes[e.id] = {
        lat: e.lat,
        lon: e.lon,
        ele: elevationMap[eleKey],
        neighbors: [],
      };
    } else if (e.type === "way") {
      ways.push(e.nodes);
    }

    for (const way of ways) {
      for (let i = 0; i < way.length - 1; i++) {
        const nodeId = way[i],
          nextId = way[i + 1];

        const node = nodes[nodeId],
          next = nodes[nextId];

        node.neighbors.push(nextId);
        next.neighbors.push(nodeId);
      }
    }
  }

  return { startNodeId, endNodeId, nodes };
}
