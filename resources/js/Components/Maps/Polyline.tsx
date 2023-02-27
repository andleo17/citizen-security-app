import { useEffect, useState } from "react";

interface PolylineProps extends google.maps.PolylineOptions {
  onChange?: (polyline: google.maps.Polyline) => void;
}

function Polyline({ onChange, ...options }: PolylineProps): JSX.Element {
  const [polyline, setPolyline] = useState<google.maps.Polyline>();

  useEffect(() => {
    if (!polyline) {
      setPolyline(new google.maps.Polyline());
    }

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  });

  useEffect(() => {
    if (polyline && options.path) {
      polyline.setOptions(options);
      if (onChange) {
        polyline.addListener("mouseup", () => onChange(polyline));
      }
    }
  }, [polyline, options]);

  return null;
}

export default Polyline;
