export function getDefaultLocation() {
  const location: string = import.meta.env.VITE_DEFAULT_LOCATION;
  const coordinates = location.split(",");
  return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) };
}
