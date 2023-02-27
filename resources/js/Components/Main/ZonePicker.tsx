import { ZonePickerContext } from "@/Hooks/UseZonePicker";
import { ChangeEventHandler, useContext } from "react";
import SelectInput from "../Common/Forms/SelectInput";

interface ZonePickerProps {
  zones: any[];
}

export default function ZonePicker({ zones }: ZonePickerProps) {
  const { setZone } = useContext(ZonePickerContext);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setZone(e.target.value);
  };

  return (
    <SelectInput onChange={handleChange}>
      {zones.map((z) => (
        <SelectInput.Item key={z.id} value={z.id}>
          {z.name}
        </SelectInput.Item>
      ))}
    </SelectInput>
  );
}
