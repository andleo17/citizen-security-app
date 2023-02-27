export function pointToJson(point: any) {
  if (!point) return undefined;

  const { coordinates } = point;
  return { lat: coordinates[1], lng: coordinates[0] };
}

export function lineStringtoJson(lineString: any) {
  if (!lineString) return undefined;

  const { coordinates } = lineString;
  return coordinates.map((c: any) => ({ lat: c[1], lng: c[0] }));
}

export function polygonToJson(polygon: any) {
  if (!polygon) return undefined;

  const { coordinates } = polygon;
  return coordinates[0].map((c: any) => ({ lat: c[1], lng: c[0] }));
}
