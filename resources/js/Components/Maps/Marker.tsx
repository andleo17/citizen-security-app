import { useEffect, useState } from "react";

export interface MarkerOptions extends google.maps.MarkerOptions {
  displayHTML?: string;
}

const Marker: React.FC<MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    if (options.displayHTML)
      setInfoWindow(
        new google.maps.InfoWindow({
          content: options.displayHTML,
        })
      );

    setMarker(new google.maps.Marker(options));

    return () => {
      marker?.setMap(null);
      if (options.displayHTML) infoWindow?.close();
    };
  }, []);

  useEffect(() => {
    marker?.setOptions(options);
    let listener: google.maps.MapsEventListener;

    if (options.displayHTML) {
      infoWindow?.setOptions({ content: options.displayHTML });
      listener = marker?.addListener("click", () =>
        infoWindow?.open(options.map, marker)
      );
    }

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [options]);

  return null;
};

export default Marker;
