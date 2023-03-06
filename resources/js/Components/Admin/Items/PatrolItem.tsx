import type { Patrol } from "vendor";

interface PatrolItemProps {
  patrol: Patrol;
}

function PatrolItem({ patrol }: PatrolItemProps) {
  return (
    <div>
      <div>
        <b>Conductor</b>
        <span>{patrol.user?.fullname || "Sin conductor"}</span>
      </div>
      <div>
        <b>Placa de carro</b>
        <span>{patrol.car?.licensePlate || "Sin carro"}</span>
      </div>
      <div>
        <b>Zona</b>
        <span>{patrol.zone?.name || "Sin zona"}</span>
      </div>
      <div>
        <b>Tiempo de inicio</b>
        <span>{patrol.start_at}</span>
      </div>
      <div>
        <b>Tiempo de finalización</b>
        <span>{patrol.end_at}</span>
      </div>
      <div>
        <b>Tiempo real de inicio</b>
        <span>{patrol.started_at || "--"}</span>
      </div>
      <div>
        <b>Tiempo real de finalización</b>
        <span>{patrol.finished_at || "--"}</span>
      </div>
    </div>
  );
}

export default PatrolItem;
