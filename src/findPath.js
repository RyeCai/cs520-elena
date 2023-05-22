import fetchPathData from "./fetchPathData.js";

export default async function findPath({ startCoords, endCoords, elevationGain, extraDistance }) {
  const { startNodeId, endNodeId, nodes, ways } = await fetchPathData(startCoords, endCoords);

  console.log(nodes[startNodeId]);
  console.log(nodes[endNodeId]);
  console.log(nodes);
  console.log(ways);
}
