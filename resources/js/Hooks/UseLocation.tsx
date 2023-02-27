import { useEffect, useState } from "react";

function useLocation() {
  const [location, setLocation] = useState<GeolocationCoordinates>();
  const [locationError, setLocationError] =
    useState<GeolocationPositionError>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation(coords);
      },
      (error) => {
        if (error) {
          setLocationError(error);
        }
      }
    );
  }, []);

  return { location, locationError };
}

export default useLocation;
