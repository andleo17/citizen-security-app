import { useEffect, useState } from "react";

interface AreaProps extends google.maps.PolygonOptions {
  onChange?: (polygon: google.maps.Polygon) => void;
}

function Area({ onChange, ...options }: AreaProps): JSX.Element {
  const [area, setArea] = useState<google.maps.Polygon>();

  useEffect(() => {
    if (!area) {
      setArea(new google.maps.Polygon());
    }

    return () => {
      if (area) {
        area.setMap(null);
      }
    };
  });

  useEffect(() => {
    if (area && options.paths) {
      area.setOptions(options);
      if (onChange) {
        area.addListener("dragend", () => onChange(area));
        area.addListener("mouseup", () => onChange(area));
      }
    }
  }, [area, options]);

  return null;
}

export default Area;
