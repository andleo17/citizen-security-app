import Marker from "../Maps/Marker";

interface ReportMarkerOptions {
  report: any;
  map?: google.maps.Map;
}

export default function ReportMarker({ report, map }: ReportMarkerOptions) {
  return (
    <Marker
      icon={{
        url: "https://cdn-icons-png.flaticon.com/512/1166/1166009.png",
        scaledSize: new google.maps.Size(32, 32),
      }}
      map={map}
    />
  );
}
