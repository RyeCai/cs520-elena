import Bottleneck from "bottleneck";
import fetchPath from "./fetchPath.js";

const limiter = new Bottleneck({
  minTime: 500,
});

export default async function findPath({ startCoords, endCoords, elevationOption, extraDistancePercent }) {
  if (extraDistancePercent < 0 || extraDistancePercent > 50)
    throw new Error(`Invalid extra allowed distance: ${extraDistancePercent}`);

  const shortestResult = await fetchPath(startCoords, endCoords, {
    considerElevation: false,
    downhillCost: 0,
    uphillCost: 0,
  });

  const shortestDistance = shortestResult.distance;

  const maxDistance = shortestDistance * (1 + extraDistancePercent);

  let cost = 1000;

  const shouldMaximizeElevation = elevationOption === "maximize";

  let path, distance, elevationGain;
  do {
    cost /= 2;

    const result = await limiter.schedule(() =>
      fetchPath(startCoords, endCoords, {
        considerElevation: true,
        downhillCost: shouldMaximizeElevation ? cost : 0,
        uphillCost: shouldMaximizeElevation ? 0 : cost,
      })
    );

    path = result.path;
    distance = result.distance;
    elevationGain = result.elevationGain;
  } while (distance > maxDistance && cost > 1);

  if (distance > maxDistance) {
    return undefined;
  }

  return { shortestDistance, path, distance, elevationGain };
}
