import { ZonePickerContext } from "@/Hooks/UseZonePicker";
import { useContext } from "react";
import Area from "../Maps/Area";
import { polygonToJson } from "@/Utils/Geometry";

function ZoneArea({ map }: any) {
  const { currentZone } = useContext(ZonePickerContext);

  return <Area paths={polygonToJson(currentZone.area)} map={map} />;
}

export default ZoneArea;
