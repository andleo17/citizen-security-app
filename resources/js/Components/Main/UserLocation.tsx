import useLocation from "@/Hooks/UseLocation";
import Marker from "../Maps/Marker";

interface UserLocationProps {
  map?: google.maps.Map;
}

function UserLocation({ map }: UserLocationProps) {
  const { location } = useLocation();

  if (!location) return null;

  return (
    <Marker
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#1c74ec",
        fillOpacity: 1.0,
        strokeColor: "white",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        scale: 8,
      }}
      position={{ lat: location?.latitude, lng: location?.longitude }}
      map={map}
    />
  );
}

export default UserLocation;
