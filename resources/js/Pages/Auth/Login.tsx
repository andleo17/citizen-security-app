import { useEffect } from "react";
import Checkbox from "@/Components/Common/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Common/Forms/ErrorMessage";
import InputLabel from "@/Components/Common/Forms/Label";
import PrimaryButton from "@/Components/Common/PrimaryButton";
import TextInput from "@/Components/Common/Forms/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

interface LoginProps {
  status: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    dni: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setData(
      event.target.name as "dni" | "password" | "remember",
      event.target.type === "checkbox"
        ? event.target.checked
          ? "true"
          : "false"
        : event.target.value
    );
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <TextInput
          id="dni"
          type="text"
          labelText="DNI"
          value={data.dni}
          autoComplete="username"
          onChange={onHandleChange}
          errors={errors.dni}
        />

        <TextInput
          id="password"
          type="password"
          labelText="Contraseña"
          value={data.password}
          autoComplete="current-password"
          onChange={onHandleChange}
          errors={errors.password}
        />

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Recuérdame
            </span>
          </label>
        </div>

        <div className="flex items-center justify-start mt-4">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link
            href={route("register")}
            className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          >
            Regístrate
          </Link>
          <PrimaryButton processing={processing}>Ingresar</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
