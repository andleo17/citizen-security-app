import FileInput from "@/Components/Common/Forms/FileInput";
import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import PrimaryButton from "@/Components/Common/PrimaryButton";
import Slider from "@/Components/Common/Slider";
import useLocation from "@/Hooks/UseLocation";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import { User } from "vendor";

interface MainProps {
  auth: { user: User };
}

export default function Main({ auth }: MainProps) {
  const { data, setData, post, processing, errors, transform } = useForm({
    description: "",
    photos: null,
    emergency: false,
    location: null,
  });

  const { location, locationError } = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route("reports.store"));
  };

  useEffect(() => {
    if (location)
      setData(
        "location",
        JSON.stringify({ lat: location.latitude, lng: location.longitude })
      );
  }, [location]);

  return (
    <AppLayout auth={auth}>
      <Head title="Inicio" />
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
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
            <PrimaryButton
              type="submit"
              processing={processing || !!locationError || !location}
              className="self-end mt-3 sm:mt-0"
            >
              Enviar reporte
            </PrimaryButton>
          </div>
          <div>
            <Slider
              maxValue={200}
              onSlideEnd={() => {
                transform((prev) => ({
                  ...data,
                  description:
                    "¡Auxilio! Estoy en una emergencia. Necesito a las autoridades urgentemente.",
                  emergency: true,
                }));

                post(route("reports.store"));
              }}
            />
            <p className="text-red-900 dark:text-red-600 mt-3 text-center">
              Desliza hacia el final para enviar un reporte de emergencia.
            </p>
          </div>
          <div>
            <Slider
              className="familiar"
              maxValue={200}
              onSlideEnd={() => {
                transform((prev) => ({
                  ...prev,
                  description:
                    "¡Auxilio! Estoy en una emergencia de violencia familiar. Necesito a las autoridades urgentemente.",
                  emergency: true,
                }));
                post(route("reports.store"));
              }}
            />
            <p className="text-red-900 dark:text-red-600 mt-3 text-center">
              Desliza hacia el final para enviar un reporte de emergencia acerca
              de violencia familiar.
            </p>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}
