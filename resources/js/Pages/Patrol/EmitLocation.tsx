import type { Patrol, User } from "vendor";

import RadarIcon from "@/Icons/RadarIcon";
import AppLayout from "@/Layouts/AppLayout";
import { Head, router } from "@inertiajs/react";
import useLongPress from "@/Hooks/UseLongPress";
import { Button, Progress } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import Modal from "@/Components/Common/Modal";
import dayjs from "dayjs";

const timeFormat = "hh:mm a - DD/MM/YYYY";

interface EmitLocationProps {
  auth: { user: User };
  patrol?: Patrol;
}

function formatDistance(distance?: number) {
  if (distance < 1000) {
    return distance.toFixed(2) + " m";
  }

  return (distance / 1000).toFixed(2) + " km";
}

function EmitLocation({ auth, patrol }: EmitLocationProps) {
  const [patrolStarted, setPatrolStart] = useState(patrol?.started);
  const { progress, ...longPress } = useLongPress(
    () => router.delete(route("patrol.finish")),
    3000
  );
  const [distance, setDistance] = useState(patrol?.distance || 0);

  useEffect(() => {
    let watchPosition: number;

    if (patrolStarted) {
      watchPosition = window.setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
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
          },
          (e) => console.error(e),
          { enableHighAccuracy: true }
        );
      }, 3000);
    }

    return () => {
      if (watchPosition) window.clearInterval(watchPosition);
    };
  }, [patrolStarted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await axios.post(route("patrol.start"));

    if (data.status) {
      setPatrolStart(true);
    }
  }

  if (!patrol)
    return (
      <AppLayout auth={auth}>
        <Head title="Patrullar" />
        <div className="text-center h-full flex flex-col items-center">
          <span>No se encuentran patrullas programadas para ti</span>
        </div>
      </AppLayout>
    );

  return (
    <AppLayout auth={auth}>
      <Head title="Patrullar" />
      <div className="text-center h-full flex flex-col items-center">
        <span className="font-semibold">Hola de nuevo</span>
        <h1 className="font-bold text-xl text-gray-900 dark:text-gray-400">
          {auth.user.fullname}
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
      <Modal show={!patrolStarted}>
        <form className="dark:text-white" onSubmit={handleSubmit}>
          <header className="bg-gray-300 dark:bg-gray-700 p-4">
            <h2 className="font-bold">Confirmación de patrulla</h2>
          </header>
          <div className="p-4 space-y-3">
            <span>Tienes una patrulla pendiente</span>
            <div>
              <b className="block">Placa de carro</b>
              <span>{patrol.car.licensePlate}</span>
            </div>
            <div>
              <b className="block">Fecha de inicio</b>
              <span>{dayjs(patrol.start_at).format(timeFormat)}</span>
            </div>
            <div>
              <b className="block">Fecha de finalización</b>
              <span>{dayjs(patrol.end_at).format(timeFormat)}</span>
            </div>
          </div>
          <footer className="bg-gray-300 dark:bg-gray-700 p-4 flex justify-center">
            <Button type="submit">Empezar patrulla</Button>
          </footer>
        </form>
      </Modal>
    </AppLayout>
  );
}

export default EmitLocation;
