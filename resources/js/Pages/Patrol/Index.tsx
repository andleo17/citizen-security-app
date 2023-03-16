import type { Patrol, User } from "vendor";
import { FormEvent, useState } from "react";

import NotFound from "./NotFound";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import EmitLocation from "./EmitLocation";
import Modal from "@/Components/Common/Modal";
import dayjs from "dayjs";
import { Button } from "flowbite-react";

const timeFormat = "hh:mm a - DD/MM/YYYY";

interface PatrolIndexPageProps {
  auth: { user: User };
  patrol?: Patrol;
}

function PatrolIndexPage({ auth, patrol }: PatrolIndexPageProps) {
  const [patrolStarted, setPatrolStart] = useState(patrol?.started);
  let content: JSX.Element;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data } = await axios.post(route("patrol.start"));

    if (data.status) {
      setPatrolStart(true);
    }
  }

  if (!patrol) {
    content = <NotFound />;
  } else if (patrolStarted) {
    content = (
      <EmitLocation patrol={patrol} userFullname={auth.user.fullname} />
    );
  } else {
    content = (
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
    );
  }

  return (
    <AppLayout auth={auth}>
      <Head title="Patrullar" />
      {content}
    </AppLayout>
  );
}

export default PatrolIndexPage;
