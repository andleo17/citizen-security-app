import { ZonePickerContext } from "@/Hooks/UseZonePicker";
import { Fragment, useContext, useEffect } from "react";
import Marker from "../Maps/Marker";
import Polyline from "../Maps/Polyline";
import truckIcon from "@icons/truck-icon.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { lineStringtoJson, pointToJson } from "@/Utils/Geometry";

function TruckInfo({ truck }: any) {
  return (
    <p className="font-bold">
      <span className="font-extrabold mr-2">Placa:</span>
      {truck.licensePlate}
    </p>
  );
}

function ZoneTrucks({ map }: any) {
  const { currentZone, updateTruckLocation, trucks } =
    useContext(ZonePickerContext);

  useEffect(() => {
    Echo.channel(`zones.${currentZone.id}`).listen(
      ".truck.location",
      function ({ truck }: any) {
        updateTruckLocation(truck);
      }
    );

    return () => {
      Echo.leaveChannel(`zones.${currentZone.id}`);
    };
  }, [currentZone]);

  return (
    <>
      {trucks?.map((t: any) => (
        <Fragment key={t.id}>
          <Marker
            icon={{
              url: truckIcon,
              scale: 0.5,
              scaledSize: new google.maps.Size(35, 35),
            }}
            position={pointToJson(t.location)}
            displayHTML={renderToStaticMarkup(<TruckInfo truck={t} />)}
            map={map}
          />
          <Polyline
            path={lineStringtoJson(t.route)}
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

export default ZoneTrucks;
