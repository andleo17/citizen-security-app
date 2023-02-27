import SelectInput from "@/Components/Common/Forms/SelectInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import { useForm } from "@inertiajs/react";
import { Button, ToggleSwitch } from "flowbite-react";
import { FormEventHandler, useEffect } from "react";

interface UserFormProps {
  user?: any;
}

function UserForm({ user }: UserFormProps) {
  const { data, setData, post, processing, errors, put, reset, transform } =
    useForm({
      dni: user?.dni || "",
      name: user?.name || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "Citizen",
      password: "",
      password_confirmation: "",
      state: user?.state || true,
    });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (user) {
      transform((d) => ({
        ...d,
        password: d.password.length > 0 ? d.password : null,
        password_confirmation:
          d.password.length > 0 ? d.password_confirmation : null,
      }));
      put(route("admin.users.update", { id: user.id }));
    } else {
      post(route("admin.users.store"));
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="dni"
        labelText="Documento de identidad"
        type="number"
        placeholder="Ingrese el DNI"
        value={data.dni}
        errors={errors.dni}
        required
        onChange={(e) => setData("dni", e.target.value)}
      />
      <TextInput
        id="name"
        labelText="Nombres"
        placeholder="Ingrese los nombres"
        value={data.name}
        errors={errors.name}
        required
        onChange={(e) => setData("name", e.target.value)}
      />
      <TextInput
        id="lastname"
        labelText="Apellidos"
        placeholder="Ingrese los apellidos"
        value={data.lastname}
        errors={errors.lastname}
        required
        onChange={(e) => setData("lastname", e.target.value)}
      />
      <TextInput
        id="email"
        labelText="Correo electrónico"
        placeholder="Ingrese el correo electrónico"
        type="email"
        value={data.email}
        errors={errors.email}
        required
        onChange={(e) => setData("email", e.target.value)}
      />
      <TextInput
        id="phone"
        labelText="Teléfono"
        placeholder="Ingrese el teléfono"
        type="tel"
        value={data.phone}
        errors={errors.phone}
        onChange={(e) => setData("phone", e.target.value)}
      />
      <SelectInput
        id="role"
        value={data.role}
        labelText="Rol"
        errors={errors.role}
        onChange={(e) => setData("role", e.target.value)}
      >
        <SelectInput.Item value="Citizen">Ciudadano</SelectInput.Item>
        <SelectInput.Item value="Police">Policía</SelectInput.Item>
        <SelectInput.Item value="Admin">Administrador</SelectInput.Item>
      </SelectInput>
      <TextInput
        id="password"
        labelText="Contraseña"
        placeholder="Ingrese la contraseña"
        type="password"
        value={data.password}
        errors={errors.password}
        onChange={(e) => setData("password", e.target.value)}
      />
      {(data.password.length > 0 || !user) && (
        <TextInput
          id="password_confirmation"
          labelText="Verificación de contraseña"
          placeholder="Ingrese nuevamente la contraseña"
          type="password"
          value={data.password}
          errors={errors.password}
          onChange={(e) => setData("password", e.target.value)}
        />
      )}
      <ToggleSwitch
        checked={data.state}
        label="Activo"
        onChange={(e) => setData("state", e)}
      />
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default UserForm;
