import Map, { MapWrapper } from "@/Components/Maps/Map";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

function getDefaultLocation() {
  const location: string = import.meta.env.VITE_DEFAULT_LOCATION;
  const coordinates = location.split(",");
  return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) };
}

function Watch(props: any) {
  return (
    <AppLayout auth={props.auth}>
      <Head title="Vigilancia" />
      <MapWrapper>
        <Map zoom={15} center={getDefaultLocation()} mapTypeControl={false}>
          <ReportMarker />
        </Map>
      </MapWrapper>
    </AppLayout>
  );
}

export default Watch;
