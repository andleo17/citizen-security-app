import RadarIcon from "@/Icons/RadarIcon";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, router } from "@inertiajs/react";
import useLongPress from "@/Hooks/UseLongPress";
import { Progress } from "flowbite-react";
import { useEffect } from "react";

async function leaveTruck(id: number) {
  router.delete(route("driver.truck.destroy", id));
}

function EmitLocation({ auth, truck }: any) {
  const { progress, ...longPress } = useLongPress(
    () => leaveTruck(truck.id),
    3000
  );

  useEffect(() => {
    let watchPosition: number;

    if (truck) {
      watchPosition = navigator.geolocation.watchPosition(
        ({ coords }) => {
          axios.put(route("driver.truck.location", truck.id), {
            location: JSON.stringify({
              lat: coords.latitude,
              lng: coords.longitude,
            }),
          });
        },
        (e) => {
          console.error(e);
        },
        { timeout: 3000 }
      );
    }

    return () => {
      if (watchPosition) navigator.geolocation.clearWatch(watchPosition);
    };
  }, []);

  return (
    <AppLayout auth={auth}>
      <Head title="Emitiendo ubicación" />
      <div className="text-center h-full flex flex-col items-center">
        <span className="font-semibold">Hola de nuevo</span>
        <h1 className="font-bold text-xl text-gray-900 dark:text-gray-400">
          {auth.user.fullname}
        </h1>
        <Link
          href={route("driver.truck.edit")}
          className="my-5 font-bold text-sm sm:text-4xl text-gray-900 dark:text-gray-400 border rounded px-4 py-2 dark:bg-slate-800 dark:hover:bg-slate-200 dark:hover:text-gray-900 bg-slate-400 hover:bg-slate-600 hover:text-white"
        >
          {truck ? truck.licensePlate : "Selecciona un camión para empezar"}
        </Link>
        {truck && (
          <div className="flex-grow flex items-center justify-center flex-col">
            <button type="button" {...longPress}>
              <RadarIcon />
            </button>
            {progress > 0 && (
              <div className="h-5 w-full mt-3">
                <Progress progress={progress} size="md" color="dark" />
              </div>
            )}
            <p>Estamos enviando tu ubicacíon a todos los ciudadanos</p>
          </div>
        )}
      </div>
      {truck && (
        <footer className="absolute bottom-0 left-0 right-0 bg-red-900 text-white p-3 text-center md:text-base sm:text-sm text-xs">
          Recuerda mantener encendida la pantalla en esta ventana para que
          funcione correctamente
        </footer>
      )}
    </AppLayout>
  );
}

export default EmitLocation;
