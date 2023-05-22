import Bottleneck from "bottleneck";
import { getBounds } from "geolib";
import wretch from "wretch";

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

const makeEleKey = ({ lon, lat }) => `[${lon.toFixed(6)},${lat.toFixed(6)}]`;

async function fetchElevationData({ elements }) {
  const elevationMap = {};

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
      const key = makeEleKey({ lon: longitude, lat: latitude });

      elevationMap[key] = elevation;
    }
  }

  return elevationMap;
}

export default async function fetchPathData(startCoords, endCoords) {
  const arrToPoint = a => makePoint(a[0], a[1]);
  const startPoint = arrToPoint(startCoords);
  const endPoint = arrToPoint(endCoords);

  const { minLat, minLng, maxLat, maxLng } = getBounds([startPoint, endPoint]);
  const query = `
    [out:json][bbox:${minLat},${minLng},${maxLat},${maxLng}];
    (
      node;
      way(bn);
    );
    out;`;

  const osmResult = await fetchOSMData(query);
  const elevationMap = await fetchElevationData(osmResult);

  const nodes = {},
    ways = {};

  for (const e of osmResult.elements) {
    if (e.type === "node") {
      const { lat, lon } = e;
      const eleKey = makeEleKey({ lat, lon });

      nodes[e.id] = {
        lat: e.lat,
        lon: e.lon,
        ele: elevationMap[eleKey],
      };
    } else if (e.type === "way") {
      ways[e.id] = e.nodes;
    }
  }

  return [nodes, ways];
}
