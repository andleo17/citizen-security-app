import SelectInput from "@/Components/Common/Forms/SelectInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import Area from "@/Components/Maps/Area";
import DrawManager, { OverlayType } from "@/Components/Maps/DrawManager";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import Polyline from "@/Components/Maps/Polyline";
import { lineStringtoJson, polygonToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button, Label, ToggleSwitch } from "flowbite-react";
import { FormEventHandler } from "react";

interface TruckProps {
  truck?: any;
  zones: any[];
  drivers: any[];
}

function TruckForm({ truck, zones, drivers }: TruckProps) {
  const { data, setData, post, processing, errors, put, transform } = useForm({
    licensePlate: truck?.licensePlate || "",
    route: lineStringtoJson(truck?.route) || [],
    state: truck?.state || true,
    zone_id: truck?.zone_id || -1,
    user_id: truck?.user_id || -1,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    transform((d) => ({
      ...d,
      zone_id: d.zone_id !== -1 ? d.zone_id : null,
      user_id: d.user_id !== -1 ? d.user_id : null,
    }));
    if (truck) {
      put(route("admin.trucks.update", { id: truck.id }));
    } else {
      post(route("admin.trucks.store"));
    }
  };

  function setPolylineData(polyline: google.maps.Polyline) {
    const polylinePoints = polyline
      .getPath()
      .getArray()
      .map((p) => ({ lat: p.lat(), lng: p.lng() }));

    setData("route", polylinePoints);
  }

  async function handlePolygonComplete(e: any) {
    if (e.type === "polyline") {
      const path = e.overlay
        .getPath()
        .getArray()
        .map((p: any) => ({ lat: p.lat(), lng: p.lng() }));
      setData("route", path);
      e.overlay.setMap(null);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="licensePlate"
        labelText="Placa de camión"
        placeholder="ABC-123"
        value={data.licensePlate}
        onChange={(e) => setData("licensePlate", e.target.value)}
        errors={errors.licensePlate}
        required
      />
      <SelectInput
        id="zone_id"
        labelText="Zona"
        value={data.zone_id}
        onChange={(e) => setData("zone_id", Number(e.target.value))}
        placeholder="Seleccione una zona"
        errors={errors.zone_id}
        required
      >
        {zones.map((z) => (
          <SelectInput.Item value={z.id} key={z.id}>
            {z.name}
          </SelectInput.Item>
        ))}
      </SelectInput>
      <SelectInput
        id="user_id"
        labelText="Chofer"
        value={data.user_id}
        onChange={(e) => setData("user_id", Number(e.target.value))}
        placeholder="Selecciona un usuario"
        errors={errors.user_id}
        required
      >
        {drivers.map((z) => (
          <SelectInput.Item value={z.id} key={z.id}>
            {z.name}
          </SelectInput.Item>
        ))}
      </SelectInput>

      <div>
        <div className="mb-2 block">
          <Label value="Ruta" />
          <span className="text-sm block dark:text-gray-300 text-gray-600">
            Marca en el mapa la ruta que seguirá el camión.
          </span>
        </div>
        <MapWrapper>
          <Map
            zoom={15}
            center={{ lat: -6.760066320973773, lng: -79.83479314628848 }}
            streetViewControl={false}
            mapTypeControl={false}
            className="h-[500px]"
          >
            <Area
              paths={polygonToJson(
                zones.find((z) => z.id === data.zone_id)?.area
              )}
            />
            <DrawManager
              drawingControl={true}
              eventHandler={handlePolygonComplete}
              drawingControlOptions={{ drawingModes: [OverlayType.POLYLINE] }}
            />
            <Polyline
              path={data.route}
              strokeColor={"#add8ff"}
              strokeWeight={6}
              strokeOpacity={1}
              editable
              onChange={setPolylineData}
            />
          </Map>
        </MapWrapper>
      </div>
      <ToggleSwitch
        checked={data.state}
        label="Activo"
        onChange={(e) => setData("state", e)}
      />
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default TruckForm;
