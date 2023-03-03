import { createContext, PropsWithChildren, useState } from "react";

interface ZonePickerProviderProps {
  zones: any[];
}

interface ZonePickerContextType {
  currentZone: any;
  setZone: (id: string) => void;
  updateTruckLocation: (truck: any) => void;
  trucks: any[];
}

export const ZonePickerContext = createContext<ZonePickerContextType>(null);

export function ZonePickerProvider({
  children,
  zones,
}: PropsWithChildren<ZonePickerProviderProps>) {
  const [currentZone, setCurrentZone] = useState(zones[0]);
  const [trucks, setTrucks] = useState(zones[0].trucks);

  function setZone(id: string) {
    const zone = zones.find((z) => z.id === Number(id));
    setCurrentZone(zone);
    setTrucks(zone.trucks);
  }

  function updateTruckLocation(truck: any) {
    const newTrucks = [...trucks];
    const currentTruckIndex = newTrucks.findIndex(
      (t: any) => t.id === truck.id
    );
    if (currentTruckIndex !== -1) {
      if (truck.user_id) {
        newTrucks[currentTruckIndex].location = truck.location;

        setTrucks(newTrucks);
      } else {
        setTrucks(newTrucks.filter((t) => t.id !== truck.id));
      }
    } else {
      newTrucks.push(truck);
      setTrucks(newTrucks);
    }
  }

  return (
    <ZonePickerContext.Provider
      value={{ currentZone, setZone, updateTruckLocation, trucks }}
    >
      {children}
    </ZonePickerContext.Provider>
  );
}
