import type { Patrol } from "vendor";

import RadarIcon from "@/Icons/RadarIcon";
import { router } from "@inertiajs/react";
import useLongPress from "@/Hooks/UseLongPress";
import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";

interface EmitLocationProps {
  userFullname: string;
  patrol?: Patrol;
}

function formatDistance(distance?: number) {
  if (distance < 1000) {
    return distance.toFixed(2) + " m";
  }

  return (distance / 1000).toFixed(2) + " km";
}

function EmitLocation({ userFullname, patrol }: EmitLocationProps) {
  const { progress, ...longPress } = useLongPress(
    () => router.delete(route("patrol.finish")),
    3000
  );
  const [distance, setDistance] = useState(patrol?.distance || 0);

  useEffect(() => {
    const watchPosition = navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (coords.speed >= 2.777) {
          axios
            .put(route("patrol.location"), {
              location: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
            })
            .then(({ data }) => {
              setDistance(data.distance);
            });
        }
      },
      (e) => console.error(e),
      { enableHighAccuracy: true }
    );

    return () => {
      if (watchPosition) navigator.geolocation.clearWatch(watchPosition);
    };
  }, []);

  return (
    <>
      <div className="text-center h-full flex flex-col items-center">
        <span className="font-semibold">Hola de nuevo</span>
        <h1 className="font-bold text-xl text-gray-900 dark:text-gray-400">
          {userFullname}
        </h1>
        <div className="flex-grow flex items-center justify-center flex-col">
          <button type="button" {...longPress}>
            <RadarIcon />
          </button>
          {progress > 0 && (
            <div className="h-5 w-full mt-3">
              <Progress progress={progress} size="md" color="dark" />
            </div>
          )}
          <p className="mt-3">Estamos enviando tu ubicacíon</p>
          <div className="mt-6 text-center">
            <p className="font-bold text-md">Distancia recorrida</p>
            <span className="text-4xl">{formatDistance(distance)}</span>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 right-0 bg-red-900 text-white p-3 text-center md:text-base sm:text-sm text-xs">
        Recuerda mantener encendida la pantalla en esta ventana para que
        funcione correctamente
      </footer>
    </>
  );
}

export default EmitLocation;
