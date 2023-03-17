import type { Car, Patrol, User, Zone } from "vendor";

import TextInput from "@/Components/Common/Forms/TextInput";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import Polyline from "@/Components/Maps/Polyline";
import { lineStringtoJson, polygonToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button, Label } from "flowbite-react";
import { FormEvent, useState } from "react";
import SelectInput from "@/Components/Common/Forms/SelectInput";
import Area from "@/Components/Maps/Area";
import dayjs from "dayjs";
import ErrorMessage from "@/Components/Common/Forms/ErrorMessage";

interface PatrolFormProps {
  patrol?: Patrol;
  zones: Zone[];
  drivers: User[];
  cars: Car[];
}

const formatTemplate = "YYYY-MM-DDTHH:mm";

function usePatrolForm(patrol?: Patrol) {
  const { data, setData, put, post, errors, processing, transform } = useForm({
    start_at: patrol?.start_at || dayjs().format(formatTemplate),
    end_at: patrol?.end_at || dayjs().add(1, "hours").format(formatTemplate),
    route_path: lineStringtoJson(patrol?.route_path) || [],
    user_id: patrol?.user_id || -1,
    car_id: patrol?.car_id || -1,
    zone_id: patrol?.zone_id || -1,
    route_id: patrol?.route_id || -1,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    transform((d) => ({
      ...d,
      user_id: d.user_id !== -1 ? d.user_id : null,
      car_id: d.car_id !== -1 ? d.car_id : null,
      zone_id: d.zone_id !== -1 ? d.zone_id : null,
      route_id: d.route_id !== -1 ? d.route_id : null,
    }));
    if (patrol) {
      put(route("admin.patrols.update", { id: patrol.id }));
    } else {
      post(route("admin.patrols.store"));
    }
  }

  function setPolylineData(polyline: google.maps.Polyline) {
    const polylinePoints = polyline
      .getPath()
      .getArray()
      .map((p) => ({ lat: p.lat(), lng: p.lng() }));

    setData("route_path", polylinePoints);
  }

  return {
    data,
    setData,
    processing,
    errors,
    handleSubmit,
    setPolylineData,
  };
}

function PatrolForm({ patrol, zones, drivers, cars }: PatrolFormProps) {
  const { data, setData, processing, errors, handleSubmit, setPolylineData } =
    usePatrolForm(patrol);
  const [selectedZone, setSelectedZone] = useState<Zone>(patrol?.zone);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="start_at"
        type="datetime-local"
        labelText="Fecha de inicio"
        value={data.start_at}
        onChange={(e) => setData("start_at", e.target.value)}
        errors={errors.start_at}
        required
      />
      <TextInput
        id="end_at"
        type="datetime-local"
        labelText="Fecha de finalización"
        value={data.end_at}
        onChange={(e) => setData("end_at", e.target.value)}
        errors={errors.end_at}
        required
      />
      <SelectInput
        id="user_id"
        labelText="Conductor"
        value={data.user_id}
        onChange={(e) => setData("user_id", Number(e.target.value))}
        placeholder="Seleccione un conductor"
        errors={errors.user_id}
        required
      >
        {drivers.map((d) => (
          <SelectInput.Item value={d.id} key={d.id}>
            {d.fullname}
          </SelectInput.Item>
        ))}
      </SelectInput>
      <SelectInput
        id="car_id"
        labelText="Carro"
        value={data.car_id}
        onChange={(e) => setData("car_id", Number(e.target.value))}
        placeholder="Seleccione un carro"
        errors={errors.car_id}
        required
      >
        {cars.map((c) => (
          <SelectInput.Item value={c.id} key={c.id}>
            {c.licensePlate}
          </SelectInput.Item>
        ))}
      </SelectInput>
      <SelectInput
        id="zone_id"
        labelText="Zona"
        value={data.zone_id}
        onChange={(e) => {
          setData("zone_id", Number(e.target.value));
          setSelectedZone(zones.find((z) => z.id === Number(e.target.value)));
        }}
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
        id="route_id"
        labelText="Ruta"
        value={data.route_id}
        onChange={(e) => {
          setData("route_id", Number(e.target.value));
          setData(
            "route_path",
            lineStringtoJson(
              selectedZone.routes.find((r) => r.id === Number(e.target.value))
                .path
            )
          );
        }}
        placeholder="Seleccione una ruta"
      >
        {selectedZone?.routes.map((r) => (
          <SelectInput.Item value={r.id} key={r.id}>
            {r.name}
          </SelectInput.Item>
        ))}
      </SelectInput>
      <div>
        <div className="mb-2 block">
          <Label value="Ruta" />
          <span className="text-sm block dark:text-gray-300 text-gray-600">
            Marca en el mapa la ruta que seguirá el camión.
          </span>
          {errors.route_path && <ErrorMessage message={errors.route_path} />}
        </div>
        <MapWrapper>
          <Map
            zoom={15}
            center={{ lat: -6.760066320973773, lng: -79.83479314628848 }}
            streetViewControl={false}
            mapTypeControl={false}
            className="h-[500px]"
          >
            <Area paths={polygonToJson(selectedZone?.area)} />
            <Polyline
              path={data.route_path}
              strokeColor={"#add8ff"}
              strokeWeight={6}
              strokeOpacity={1}
              editable
              onChange={setPolylineData}
            />
          </Map>
        </MapWrapper>
      </div>
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default PatrolForm;
