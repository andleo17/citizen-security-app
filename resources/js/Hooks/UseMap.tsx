import { useEffect, useRef, useState } from "react";

function useMap(mapOptions: google.maps.MapOptions) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(new window.google.maps.Map(mapRef.current, mapOptions));
    }
  }, [mapRef, map]);

  return { mapRef, map };
}

export default useMap;
