import type { Route, Zone } from "vendor";

import TextInput from "@/Components/Common/Forms/TextInput";
import Area from "@/Components/Maps/Area";
import DrawManager, { OverlayType } from "@/Components/Maps/DrawManager";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import { lineStringtoJson, polygonToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button, Label } from "flowbite-react";
import { FormEvent } from "react";
import ErrorMessage from "@/Components/Common/Forms/ErrorMessage";
import Polyline from "@/Components/Maps/Polyline";
import SelectInput from "@/Components/Common/Forms/SelectInput";

interface RouteFormProps {
  route_model?: Route;
  zones: Zone[];
}

function useRouteForm(route_model?: Route) {
  const { data, setData, post, processing, errors, put } = useForm({
    name: route_model?.name || "",
    path: lineStringtoJson(route_model?.path) || [],
    zone_id: route_model?.zone_id || -1,
  });

  function setPolylineData(polyline: google.maps.Polyline) {
    const polylinePoints = polyline
      .getPath()
      .getArray()
      .map((p) => ({ lat: p.lat(), lng: p.lng() }));

    setData("path", polylinePoints);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (route_model) {
      put(route("admin.routes.update", { id: route_model.id }));
    } else {
      post(route("admin.routes.store"));
    }
  }

  function handlePolylineComplete(e: any) {
    if (e.type === "polyline") {
      setPolylineData(e.overlay);
      e.overlay.setMap(null);
    }
  }

  return {
    data,
    setData,
    processing,
    errors,
    setPolylineData,
    handleSubmit,
    handlePolylineComplete,
  };
}

function ZoneForm({ route_model: route, zones }: RouteFormProps) {
  const {
    data,
    setData,
    processing,
    errors,
    setPolylineData,
    handleSubmit,
    handlePolylineComplete,
  } = useRouteForm(route);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="name"
        labelText="Nombre"
        placeholder="Ruta 01"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        errors={errors.name}
        required
      />
      <SelectInput
        id="zone_id"
        labelText="Zona"
        value={data.zone_id}
        onChange={(e) => {
          setData("zone_id", Number(e.target.value));
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
      <div>
        <div className="mb-2 block">
          <Label value="Indicaciones" />
          <span className="text-sm block dark:text-gray-300 text-gray-600">
            Marca en el mapa los puntos que generan la ruta
          </span>
          {errors.path && <ErrorMessage message={errors.path} />}
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
            {data.path.length > 0 ? (
              <Polyline
                path={data.path}
                editable
                draggable
                onChange={setPolylineData}
              />
            ) : (
              <DrawManager
                drawingMode={OverlayType.POLYLINE}
                drawingControl={false}
                eventHandler={handlePolylineComplete}
              />
            )}
          </Map>
        </MapWrapper>
      </div>
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default ZoneForm;
