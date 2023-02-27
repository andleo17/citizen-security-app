import { useForm } from "@inertiajs/react";
import { Button, Label, Select, TextInput, ToggleSwitch } from "flowbite-react";
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="dni" value="Documento de identidad" />
        </div>
        <TextInput
          id="dni"
          type="number"
          placeholder="12345678"
          value={data.dni}
          onChange={(e) => setData("dni", e.target.value)}
          helperText={errors.dni}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Nombres" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="Juan"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          helperText={errors.name}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastname" value="Apellidos" />
        </div>
        <TextInput
          id="lastname"
          type="text"
          placeholder="Pérez"
          value={data.lastname}
          onChange={(e) => setData("lastname", e.target.value)}
          helperText={errors.lastname}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Correo electrónico" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={data.email}
          onChange={(e) => setData("email", e.target.value)}
          helperText={errors.email}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Rol" />
        </div>
        <Select
          id="role"
          value={data.role}
          onChange={(e) => setData("role", e.target.value)}
          helperText={errors.role}
        >
          <option value="Citizen">Ciudadano</option>
          <option value="Driver">Conductor</option>
          <option value="Admin">Administrador</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="Ingrese la nueva contraseña"
          value={data.password}
          onChange={(e) => setData("password", e.target.value)}
          helperText={errors.password}
          required={!user}
        />
      </div>
      {(data.password.length > 0 || !user) && (
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password_confirmation"
              value="Verificación de contraseña"
            />
          </div>
          <TextInput
            id="password_confirmation"
            type="password"
            placeholder="Ingrese nuevamente la contraseña"
            value={data.password_confirmation}
            onChange={(e) => setData("password_confirmation", e.target.value)}
            helperText={errors.password_confirmation}
            required
          />
        </div>
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
