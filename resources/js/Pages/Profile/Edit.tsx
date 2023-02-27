import Label from "@/Components/Common/Forms/Label";
import TextInput from "@/Components/Common/Forms/TextInput";
import NavLink from "@/Components/Common/NavLink";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { FormEventHandler, MouseEventHandler } from "react";

function EditProfile({ auth }: any) {
  const {
    data,
    setData,
    put,
    errors,
    delete: remove,
  } = useForm({
    dni: auth.user.dni,
    name: auth.user.name,
    lastname: auth.user.lastname,
    email: auth.user.email,
    password: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route("profile.update"));
  };

  const handleRemoveAccount: MouseEventHandler<HTMLButtonElement> = () => {
    remove(route("profile.destroy"));
  };

  return (
    <AppLayout auth={auth}>
      <Head title="Perfil" />
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          id="dni"
          value={data.dni}
          labelText="DNI"
          placeholder="N° del documento de identidad"
          onChange={(e) => setData("dni", e.target.value)}
          errors={errors.dni}
        />
        <TextInput
          id="name"
          value={data.name}
          labelText="Nombres"
          placeholder="Nombre del ciudadano"
          onChange={(e) => setData("name", e.target.value)}
          errors={errors.name}
        />
        <TextInput
          id="lastname"
          value={data.lastname}
          labelText="Apellidos"
          placeholder="Apellidos del ciudadano"
          onChange={(e) => setData("lastname", e.target.value)}
          errors={errors.lastname}
        />
        <TextInput
          id="email"
          value={data.email}
          type="email"
          labelText="Email"
          placeholder="correo@ejemplo.com"
          onChange={(e) => setData("email", e.target.value)}
          errors={errors.email}
        />
        <Button type="submit">Guardar</Button>
      </form>
      <div className="mt-5 space-y-5">
        <p>Desactivación de cuenta</p>
        <TextInput
          id="password"
          value={data.password}
          labelText="Contraseña actual"
          placeholder="Coloca tu contraseña actual"
          type="password"
          onChange={(e) => setData("password", e.target.value)}
          errors={errors.password}
        />
        <Button onClick={handleRemoveAccount} type="button" color="failure">
          Eliminar cuenta
        </Button>
      </div>
    </AppLayout>
  );
}

export default EditProfile;
