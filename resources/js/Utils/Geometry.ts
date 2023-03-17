import type { LineString, Point, Polygon } from "vendor";

export function pointToJson(point: Point) {
  if (!point) return undefined;

  const { coordinates } = point;
  return { lat: coordinates[1], lng: coordinates[0] };
}

export function lineStringtoJson(lineString: LineString) {
  if (!lineString) return undefined;

  const { coordinates } = lineString;
  return coordinates.map((c) => ({ lat: c[1], lng: c[0] }));
}

export function polygonToJson(polygon: Polygon) {
  if (!polygon) return undefined;

  const { coordinates } = polygon;
  return coordinates[0].map((c) => ({ lat: c[1], lng: c[0] }));
}
