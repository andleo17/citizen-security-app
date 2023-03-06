import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { Patrol } from "vendor";

interface PatrolItemProps {
  patrol: Patrol;
}

interface PatrolStateProps {
  started: boolean;
  finished: boolean;
}

function PatrolState({ started, finished }: PatrolStateProps) {
  const [color, setColor] = useState("border-gray-700");

  useEffect(() => {
    if (finished) {
      setColor("border-green-600 bg-green-700");
    } else if (started) {
      setColor("border-red-800 bg-red-900 animate-ping");
    }
  }, [started, finished]);

  return <i className={"h-3 w-3 rounded-full border-2 " + color} />;
}

function PatrolItem({ patrol }: PatrolItemProps) {
  return (
    <div className="rounded-lg bg-gray-200 dark:bg-gray-900">
      <header className="px-4 pt-3 flex items-center justify-end">
        <PatrolState
          started={!!patrol.started_at}
          finished={!!patrol.finished_at}
        />
      </header>
      <div className="p-4 pt-0">
        <div>
          <b className="block">Conductor</b>
          <span>{patrol.user?.fullname || "Sin conductor"}</span>
        </div>
        <div>
          <b className="block">Placa de carro</b>
          <span>{patrol.car?.licensePlate || "Sin carro"}</span>
        </div>
        <div>
          <b className="block">Zona</b>
          <span>{patrol.zone?.name || "Sin zona"}</span>
        </div>
      </div>
      <footer className="text-sm flex justify-between p-4 bg-gray-300 dark:bg-gray-800">
        <div>
          <b className="mr-1">Inicio</b>
          <span>{dayjs(patrol.start_at).format("hh:mm a")}</span>
        </div>
        <div>
          <b className="mr-1">Fin</b>
          <span>{dayjs(patrol.end_at).format("hh:mm a")}</span>
        </div>
      </footer>
    </div>
  );
}

export default PatrolItem;
