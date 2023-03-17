import type { Report, ReportCategory } from "vendor";

import Label from "@/Components/Common/Forms/Label";
import SelectInput from "@/Components/Common/Forms/SelectInput";
import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import Modal from "@/Components/Common/Modal";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import Marker from "@/Components/Maps/Marker";
import { pointToJson } from "@/Utils/Geometry";
import { useForm } from "@inertiajs/react";
import { Button, ToggleSwitch } from "flowbite-react";
import { FormEventHandler, useState } from "react";
import ReportMarker from "@/Components/Main/ReportMarker";

interface ReportFormProps {
  report: Report;
  categories: ReportCategory[];
}

function ReportForm({ report, categories }: ReportFormProps) {
  const { data, setData, processing, put, transform } = useForm({
    state: report.state,
    category: report.report_sub_category?.report_category_id || -1,
    subCategory: report.report_sub_category_id || -1,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [srcImg, setSrcImg] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    transform((d) => ({
      ...d,
      subCategory: d.subCategory !== -1 ? d.subCategory : null,
    }));
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
        <SelectInput
          id="category"
          labelText="Categoría"
          placeholder="Seleccione una categoría"
          value={data.category}
          onChange={(e) => setData("category", Number(e.target.value))}
          required
        >
          {categories.map((c) => (
            <SelectInput.Item key={c.id} value={c.id}>
              {c.name}
            </SelectInput.Item>
          ))}
        </SelectInput>
        <SelectInput
          id="subCategory"
          labelText="Sub categoría"
          placeholder="Seleccione una subcategoría"
          value={data.subCategory}
          onChange={(e) => setData("subCategory", Number(e.target.value))}
          required
        >
          {categories
            .find((c) => c.id === data.category)
            ?.sub_categories?.map((c) => (
              <SelectInput.Item key={c.id} value={c.id}>
                {c.name}
              </SelectInput.Item>
            ))}
        </SelectInput>
        <TextAreaInput
          id="description"
          labelText="Descripción"
          value={report.description}
          readOnly
        />
        <ToggleSwitch
          checked={report.emergency}
          label="Marcado como emergencia"
          onChange={() => {}}
          aria-readonly
          disabled
        />
        <ToggleSwitch
          checked={data.state}
          label="Marcado como revisado"
          onChange={(e) => setData("state", e)}
        />
        {report.images && (
          <div>
            <div className="mb-2 block">
              <Label htmlFor="images" value="Fotos de prueba" />
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              {report.images.map((i: string) => (
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
              <ReportMarker report={report} onClick={null} />
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
