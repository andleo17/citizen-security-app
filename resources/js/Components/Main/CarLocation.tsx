import { useEffect, useState } from "react";
import Marker from "../Maps/Marker";
import truckIcon from "@icons/truck-icon.svg";
import { renderToStaticMarkup } from "react-dom/server";
import { pointToJson } from "@/Utils/Geometry";

function TruckInfo({ car }: any) {
  return (
    <p className="font-bold">
      <span className="font-extrabold mr-2">Placa:</span>
      {car.licensePlate}
    </p>
  );
}

function CarLocation({ map, initialCars }: any) {
  const [cars, setCars] = useState(initialCars);

  useEffect(() => {
    Echo.channel("cars").listen(".car.location", function ({ car }: any) {
      const newCars = [...cars];
      const currentTruckIndex = newCars.findIndex((t: any) => t.id === car.id);
      if (currentTruckIndex !== -1) {
        if (car.user_id) {
          newCars[currentTruckIndex].location = car.location;

          setCars(newCars);
        } else {
          setCars(newCars.filter((t) => t.id !== car.id));
        }
      } else {
        newCars.push(car);
        setCars(newCars);
      }
    });

    return () => {
      Echo.leaveChannel("cars");
    };
  }, []);

  return (
    <>
      {cars?.map((t: any) => (
        <Marker
          key={t.id}
          icon={{
            url: truckIcon,
            scale: 1,
            scaledSize: new google.maps.Size(35, 35),
          }}
          position={pointToJson(t.location)}
          displayHTML={renderToStaticMarkup(<TruckInfo car={t} />)}
          map={map}
        />
      ))}
    </>
  );
}

export default CarLocation;
