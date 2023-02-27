import useLocation from "@/Hooks/UseLocation";
import { useForm } from "@inertiajs/react";
import { Button, Label, ToggleSwitch } from "flowbite-react";
import { FormEventHandler, useEffect, useState } from "react";
import Modal from "@/Components/Common/Modal";
import TextAreaInput from "../Common/Forms/TextAreaInput";
import FileInput from "../Common/Forms/FileInput";

interface ReportFormProps {
  auth: any;
}

function ReportForm({ auth }: ReportFormProps) {
  const [isOpen, setOpen] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    description: "",
    photos: null,
    isImportant: false,
    location: null,
  });
  const { location, locationError } = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(data);
    post(route("reports.store"), {
      onSuccess() {
        reset();
        setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (location)
      setData(
        "location",
        JSON.stringify({ lat: location.latitude, lng: location.longitude })
      );
  }, [location]);

  return (
    <>
      <Button
        color="failure"
        onClick={() => setOpen(true)}
        disabled={!!locationError || !location}
      >
        Reportar incidente
      </Button>
      <Modal show={isOpen} onClose={() => setOpen(false)}>
        <div className="py-8">
          {auth.user ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Realiza un reporte
                </h3>
                <TextAreaInput
                  id="description"
                  labelText="Descripción"
                  placeholder="Describe el caso que quieres reportar."
                  rows={5}
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  errors={errors.description}
                />
                <FileInput
                  id="photos"
                  labelText="Fotos"
                  multiple
                  accept="image/*"
                  onChange={(e) => setData("photos", e.target.files)}
                  errors={errors.photos}
                  inline={false}
                />
                <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                  <div className="self-start sm:self-auto">
                    <ToggleSwitch
                      checked={data.isImportant}
                      label="Marcar como urgente"
                      onChange={(e) => setData("isImportant", e)}
                      className="self-start"
                    />
                  </div>
                  <Button
                    color="success"
                    type="submit"
                    disabled={processing}
                    className="self-end mt-3 sm:mt-0"
                  >
                    Enviar reporte
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Debes iniciar sesión para realizar reportes.
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ReportForm;
