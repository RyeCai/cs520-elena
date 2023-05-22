import { getDistance } from "geolib";
import fetchPathData from "./fetchPathData.js";

export default async function findPath({ startCoords, endCoords, elevationGain, extraDistance }) {
  if (extraDistance < 0 || extraDistance > 50) throw new Error(`Invalid extra allowed distance: ${extraDistance}`);

  const { startNodeId, endNodeId, nodes } = await fetchPathData(startCoords, endCoords);

  const shortestResult = aStar(nodes, startNodeId, endNodeId, () => 0, Infinity);
  if (!shortestResult) throw new Error("Unable to find a path between those two points.");

  const shortestPath = shortestResult.path,
    shortestDistance = shortestResult.distance;

  const result = aStar(nodes, startNodeId, endNodeId, () => 0, shortestDistance * (1 + extraDistance / 100));
  if (!result) throw new Error("Unable to find a path between those two points.");
  const { path, distance } = result;

  return { shortestPath, shortestDistance, path, distance };
}

function aStar(nodes, startId, endId, h, maxDistance) {
  function d(aId, bId) {
    return getDistance(nodes[aId], nodes[bId]);
  }

  const openSet = new Set([startId]);
  const cameFrom = {};

  function constructPath(nodeId) {
    const path = [nodeId];
    while (nodeId in cameFrom) {
      nodeId = cameFrom[nodeId];
      path.unshift(nodeId);
    }

    return path;
  }

  const gScore = {};
  gScore[startId] = 0;

  const fScore = {};
  fScore[startId] = h(startId);

  for (const nodeId of Object.keys(nodes)) {
    gScore[nodeId] = Infinity;
    fScore[nodeId] = Infinity;
  }

  while (openSet.size > 0) {
    let currentId;
    for (const nodeId of openSet) {
      if (currentId === undefined || fScore[nodeId] < fScore[currentId]) {
        currentId = nodeId;
      }
    }

    if (currentId === endId) {
      return { path: constructPath(endId), distance: gScore[currentId] };
    }

    const currentNode = nodes[currentId];
    openSet.delete(currentId);

    for (const neighborId of currentNode.neighbors) {
      const score = gScore[currentId] + d(currentId, neighborId);

      if (score < gScore[neighborId] && score < maxDistance) {
        cameFrom[neighborId] = currentId;
        gScore[neighborId] = score;
        fScore[neighborId] = score + h(neighborId);
        openSet.add(neighborId);
      }
    }
  }

  return undefined;
}
