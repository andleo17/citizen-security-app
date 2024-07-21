import { pointToJson } from "@/Utils/Geometry";
import Marker from "../Maps/Marker";
import { useEffect, useState } from "react";
import { Report } from "vendor";

interface ReportMarkerOptions {
  report: Report;
  map?: google.maps.Map;
  onClick: Function;
}

export default function ReportMarker({
  report,
  map,
  onClick,
}: ReportMarkerOptions) {
  const [isBlink, setBlink] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <Marker
      position={pointToJson(report.location)}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: isBlink ? "#661515" : "#9c1f33",
        fillOpacity: 1,
        strokeColor: "#000000",
        strokeWeight: 1.2,
      }}
      map={map}
      onClick={onClick}
    />
  );
}
