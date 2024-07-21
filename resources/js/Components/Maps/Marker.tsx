import { useEffect, useState } from "react";

export interface MarkerOptions extends google.maps.MarkerOptions {
  displayHTML?: string;
  onClick?: Function;
}

const Marker: React.FC<MarkerOptions> = ({
  displayHTML,
  onClick,
  ...options
}) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    if (displayHTML)
      setInfoWindow(
        new google.maps.InfoWindow({
          content: displayHTML,
        })
      );

    const newMarker = new google.maps.Marker(options);
    setMarker(newMarker);

    return () => {
      newMarker?.setMap(null);
      if (displayHTML) infoWindow?.close();
    };
  }, []);

  useEffect(() => {
    marker?.setOptions(options);
    let listener: google.maps.MapsEventListener;

    if (displayHTML) {
      infoWindow?.setOptions({ content: displayHTML });
    }
    if (displayHTML || onClick) {
      listener = marker?.addListener("click", () => {
        if (displayHTML) infoWindow?.open(options.map, marker);
        if (onClick) onClick();
      });
    }

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [options]);

  return null;
};

export default Marker;

