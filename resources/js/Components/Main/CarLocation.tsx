import type { Patrol } from "vendor";

import { Fragment, useCallback, useEffect, useState } from "react";
import Marker from "../Maps/Marker";
import truckIcon from "@icons/truck-icon.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { lineStringtoJson, pointToJson } from "@/Utils/Geometry";
import Polyline from "../Maps/Polyline";

interface CarLocationProps {
  map?: google.maps.Map;
  initialPatrols: Patrol[];
}

function useCarLocation(initialPatrols: Patrol[]) {
  const [patrols, setPatrols] = useState(initialPatrols);

  useEffect(() => {
    const channel = Echo.channel("patrols");

    channel.listen(".patrol.location", ({ patrol }: { patrol: Patrol }) => {
      setPatrols((prev) => {
        const currentPatrol = prev.findIndex((t) => t.id === patrol.id);

        if (currentPatrol === -1) return [...prev, patrol];

        if (patrol.finished) return prev.filter((t) => t.id !== patrol.id);

        prev[currentPatrol].location = patrol.location;
        return prev;
      });
    });

    return () => {
      channel.stopListening(".patrol.location");
      Echo.leaveChannel("patrols");
    };
  }, []);

  return patrols;
}

function PatrolInfo({ patrol }: { patrol: Patrol }) {
  return (
    <p className="font-bold">
      <span className="font-extrabold mr-2">Placa:</span>
      {patrol.car.licensePlate}
    </p>
  );
}

function CarLocation({ map, initialPatrols }: CarLocationProps) {
  const patrols = useCarLocation(initialPatrols);

  return (
    <>
      {patrols?.map((p) => (
        <Fragment key={p.id}>
          <Marker
            key={p.id}
            icon={{
              url: truckIcon,
              scaledSize: new google.maps.Size(50, 50),
            }}
            position={pointToJson(p.location)}
            displayHTML={renderToStaticMarkup(<PatrolInfo patrol={p} />)}
            map={map}
          />
          <Polyline
            path={lineStringtoJson(p.route)}
            map={map}
            strokeColor={"#add8ff"}
            strokeWeight={6}
            strokeOpacity={1}
          />
        </Fragment>
      ))}
    </>
  );
}

export default CarLocation;
