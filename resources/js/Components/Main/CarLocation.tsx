import type { Patrol } from "vendor";

import { Fragment, useEffect, useState } from "react";
import Marker from "../Maps/Marker";
import truckIcon from "@icons/truck-icon.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { lineStringtoJson, pointToJson } from "@/Utils/Geometry";
import Polyline from "../Maps/Polyline";

interface CarLocationProps {
  map?: google.maps.Map;
  initialPatrols: Patrol[];
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
  const [patrols, setPatrols] = useState(initialPatrols);

  useEffect(() => {
    Echo.channel("patrols").listen(
      ".patrol.location",
      function ({ patrol }: { patrol: Patrol }) {
        const newPatrols = [...patrols];
        const currentPatrol = newPatrols.findIndex((t) => t.id === patrol.id);
        if (currentPatrol !== -1) {
          if (patrol.user_id) {
            newPatrols[currentPatrol].location = patrol.location;

            setPatrols(newPatrols);
          } else {
            setPatrols(newPatrols.filter((t) => t.id !== patrol.id));
          }
        } else {
          newPatrols.push(patrol);
          setPatrols(newPatrols);
        }
      }
    );

    return () => {
      Echo.leaveChannel("patrols");
    };
  }, []);

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
