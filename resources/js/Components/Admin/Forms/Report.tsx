import Label from "@/Components/Common/Forms/Label";
import SelectInput from "@/Components/Common/Forms/SelectInput";
import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import Modal from "@/Components/Common/Modal";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import Marker from "@/Components/Maps/Marker";
import { pointToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FormEventHandler, useState } from "react";

interface ReportFormProps {
  report: any;
}

function ReportForm({ report }: ReportFormProps) {
  const { data, setData, processing, put } = useForm({
    state: report.state || "Pending",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [srcImg, setSrcImg] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route("admin.reports.update", { id: report.id }));
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          id="citizen"
          labelText="Ciudadano"
          value={report.user.fullname}
          readOnly
        />
        <TextAreaInput
          id="description"
          labelText="Descripción"
          value={report.description}
          readOnly
        />
        <SelectInput
          id="state"
          labelText="Estado"
          value={data.state}
          onChange={(e) => setData("state", e.target.value)}
          required
        >
          <SelectInput.Item value="Pending">Pendiente</SelectInput.Item>
          <SelectInput.Item value="Accepted">Atendido</SelectInput.Item>
          <SelectInput.Item value="Rejected">Rechazado</SelectInput.Item>
        </SelectInput>
        {report.image_paths && (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="images" value="Fotos de prueba" />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              {report.image_paths.map((i: string) => (
                <img
                  src={"/" + i}
                  alt={i}
                  key={i}
                  className="w-full sm:w-80 object-cover cursor-pointer"
                  onClick={() => {
                    setModalOpen(true);
                    setSrcImg("/" + i);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="mb-2 block">
            <Label htmlFor={null} value="Ubicación" />
          </div>
          <MapWrapper>
            <Map
              zoom={15}
              center={pointToJson(report.location)}
              mapTypeControl={false}
              className="h-[450px]"
              streetViewControl={true}
            >
              <Marker position={pointToJson(report.location)} />
            </Map>
          </MapWrapper>
        </div>
        <Button type="submit" disabled={processing}>
          Guardar
        </Button>
      </form>
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <img src={srcImg} alt="Zoomed image" className="w-full h-full" />
      </Modal>
    </>
  );
}

export default ReportForm;
