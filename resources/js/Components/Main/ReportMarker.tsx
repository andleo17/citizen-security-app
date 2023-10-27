import { pointToJson } from "@/Utils/Geometry";
import Marker from "../Maps/Marker";
import { useEffect, useState } from "react";
import { Report } from "vendor";
import axios from 'axios'

interface ReportMarkerOptions {
  report: Report
  map?: google.maps.Map;
  onClick: Function;
}

async function fetchRecomendation(report:Report) {
  const {data} = await axios.post('http://localhost:3000/predict', {
    location: pointToJson(report.location),
    created_at: new Date(report.created_at).getTime(),
    is_emergency: report.emergency,
    report_subcategory_id: report.report_sub_category_id ?? 1
  })

  return data
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

    fetchRecomendation(report).then(r => report = r)

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
