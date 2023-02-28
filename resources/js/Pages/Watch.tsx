import ReportMarker from "@/Components/Main/ReportMarker";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

function getDefaultLocation() {
  const location: string = import.meta.env.VITE_DEFAULT_LOCATION;
  const coordinates = location.split(",");
  return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) };
}

function Watch(props: any) {
  const [reports, setReports] = useState(props.reports);

  function updateReport(report: any) {
    const newReports = [...reports];
    const reportIndex = newReports.findIndex((r: any) => r.id === report.id);

    if (reportIndex === -1 && !report.state) {
      newReports.push(report);
      setReports(() => newReports);
      return;
    }

    if (report.state) {
      setReports(() => newReports.filter((r: any) => r.id !== report.id));
      return;
    }
  }

  useEffect(() => {
    Echo.channel("reports").listen(
      ".watch.reports",
      function ({ report }: any) {
        updateReport(report);
      }
    );

    return () => Echo.leaveChannel("reports");
  }, []);

  return (
    <AppLayout auth={props.auth}>
      <Head title="Vigilancia" />
      <MapWrapper>
        <Map zoom={15} center={getDefaultLocation()} mapTypeControl={false}>
          {reports.map((r: any) => (
            <ReportMarker key={r.id} report={r} />
          ))}
        </Map>
      </MapWrapper>
    </AppLayout>
  );
}

export default Watch;
