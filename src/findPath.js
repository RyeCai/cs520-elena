import fetchPathData from "./fetchPathData.js";

export default async function findPath({ startCoords, endCoords, elevationGain, extraDistance }) {
  const [nodes, ways] = await fetchPathData(startCoords, endCoords);

  console.log(nodes);
  console.log(ways);
}
