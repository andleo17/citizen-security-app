import ReportForm from "@/Components/Main/ReportForm";
import UserLocation from "@/Components/Main/UserLocation";
import ZoneArea from "@/Components/Main/ZoneArea";
import ZonePicker from "@/Components/Main/ZonePicker";
import ZoneTrucks from "@/Components/Main/ZoneTrucks";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import useLocation from "@/Hooks/UseLocation";
import { ZonePickerProvider } from "@/Hooks/UseZonePicker";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

function getDefaultLocation() {
  const location: string = import.meta.env.VITE_DEFAULT_LOCATION;
  const coordinates = location.split(",");
  return { lat: Number(coordinates[0]), lng: Number(coordinates[1]) };
}

export default function Main(props: any) {
  const { location } = useLocation();
  return (
    <ZonePickerProvider zones={props.zones}>
      <AppLayout auth={props.auth}>
        <Head title="Inicio" />
        <div className="flex justify-between mb-5 items-center">
          <ZonePicker zones={props.zones} />
          <ReportForm auth={props.auth} />
        </div>
        <MapWrapper>
          <Map
            zoom={15}
            center={
              location
                ? { lat: location.latitude, lng: location.longitude }
                : getDefaultLocation()
            }
            streetViewControl={false}
            mapTypeControl={false}
          >
            <ZoneArea />
            <ZoneTrucks />
            <UserLocation />
          </Map>
        </MapWrapper>
        <aside
          className="absolute bottom-0 left-0 z-50 justify-center w-full hidden"
          role="alert"
          id="reportToast"
        >
          <div className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div className="font-normal">
              <span className="font-bold">¡Reporte enviado!</span> Pronto
              enviaremos a las autoridades para atender tu reporte.
            </div>
          </div>
        </aside>
      </AppLayout>
    </ZonePickerProvider>
  );
}
