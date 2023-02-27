import FileInput from "@/Components/Common/Forms/FileInput";
import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import PrimaryButton from "@/Components/Common/PrimaryButton";
import useLocation from "@/Hooks/UseLocation";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";

export default function Main(props: any) {
  const { data, setData, post, processing, errors, reset } = useForm({
    description: "",
    photos: null,
    isImportant: false,
    location: null,
  });

  const { location, locationError } = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    post(route("reports.store"), {
      onSuccess() {
        reset();
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
    <AppLayout auth={props.auth}>
      <Head title="Inicio" />
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
            <PrimaryButton
              type="submit"
              processing={processing || !!locationError || !location}
              className="self-end mt-3 sm:mt-0"
            >
              Enviar reporte
            </PrimaryButton>
          </div>
        </div>
      </form>
      <aside
        className="absolute bottom-0 left-0 z-50 justify-center w-full hidden"
        role="alert"
        id="reportToast"
      >
        <div className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div className="font-normal">
            <span className="font-bold">¡Reporte enviado!</span> Pronto
            enviaremos a las autoridades para atender tu reporte.
          </div>
        </div>
      </aside>
    </AppLayout>
  );
}
