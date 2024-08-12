import { ChangeEventHandler, FormEventHandler, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label, TextInput } from "flowbite-react";
import PrimaryButton from "@/Components/Common/PrimaryButton";

interface RegisterFormInputs {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    dni: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setData(event.target.name as keyof RegisterFormInputs, event.target.value);
  };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="dni" value="DNI" />
            </div>
            <TextInput
              type="number"
              id="dni"
              name="dni"
              value={data.dni}
              autoComplete="dni"
              autoFocus
              onChange={onHandleChange}
              required
              helperText={errors.dni}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Nombres" />
            </div>
            <TextInput
              type="text"
              id="name"
              name="name"
              value={data.name}
              autoComplete="name"
              onChange={onHandleChange}
              required
              helperText={errors.name}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lastname" value="Apellidos" />
            </div>
            <TextInput
              type="text"
              id="lastname"
              name="lastname"
              value={data.lastname}
              autoComplete="lastname"
              onChange={onHandleChange}
              required
              helperText={errors.lastname}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>

            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              autoComplete="email"
              onChange={onHandleChange}
              required
              helperText={errors.email}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Contraseña" />
            </div>

            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              autoComplete="new-password"
              onChange={onHandleChange}
              helperText={errors.password}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password_confirmation"
                value="Confirmar contraseña"
              />
            </div>

            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              autoComplete="new-password"
              onChange={onHandleChange}
              helperText={errors.password_confirmation}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link
              href={route("login")}
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              ¿Ya estás registrado?
            </Link>

            <PrimaryButton
              className="ml-4"
              processing={processing}
              type="submit"
            >
              Registro
            </PrimaryButton>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}
