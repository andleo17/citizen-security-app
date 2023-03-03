import TextInput from "@/Components/Common/Forms/TextInput";
import Area from "@/Components/Maps/Area";
import DrawManager, { OverlayType } from "@/Components/Maps/DrawManager";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import { polygonToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button, Label, ToggleSwitch } from "flowbite-react";
import { FormEventHandler } from "react";

interface ZoneFormProps {
  zone?: any;
}

function ZoneForm({ zone }: ZoneFormProps) {
  const { data, setData, post, processing, errors, put } = useForm({
    name: zone?.name || "",
    area: polygonToJson(zone?.area) || [],
  });

  function setPolygonData(polygon: google.maps.Polygon) {
    const polygonPoints = polygon
      .getPath()
      .getArray()
      .map((p) => ({ lat: p.lat(), lng: p.lng() }));

    polygonPoints.push(polygonPoints[0]);

    setData("area", polygonPoints);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (zone) {
      put(route("admin.zones.update", { id: zone.id }));
    } else {
      post(route("admin.zones.store"));
    }
  };

  const handlePolygonComplete = (e: any) => {
    if (e.type === "polygon") {
      setPolygonData(e.overlay);
      e.overlay.setMap(null);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="name"
        labelText="Nombre"
        placeholder="Zona norte"
        value={data.name}
        onChange={(e) => setData("name", e.target.value)}
        required
      />
      <div>
        <div className="mb-2 block">
          <Label value="Área" />
          <span className="text-sm block dark:text-gray-300 text-gray-600">
            Marca en el mapa los puntos que generan el área
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
            {data.area.length > 0 ? (
              <Area
                paths={data.area}
                editable
                draggable
                onChange={setPolygonData}
              />
            ) : (
              <DrawManager
                drawingMode={OverlayType.POLYGON}
                drawingControl={false}
                eventHandler={handlePolygonComplete}
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
