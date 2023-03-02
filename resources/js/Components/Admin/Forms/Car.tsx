import SelectInput from "@/Components/Common/Forms/SelectInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import { useForm } from "@inertiajs/react";
import { Button, ToggleSwitch } from "flowbite-react";
import { FormEventHandler } from "react";

interface CarProps {
  car?: any;
  drivers: any[];
}

function CarForm({ car, drivers }: CarProps) {
  const { data, setData, post, processing, errors, put, transform } = useForm({
    licensePlate: car?.licensePlate || "",
    state: car?.state || true,
    user_id: car?.user_id || -1,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    transform((d) => ({
      ...d,
      user_id: d.user_id !== -1 ? d.user_id : null,
    }));
    if (car) {
      put(route("admin.cars.update", { id: car.id }));
    } else {
      post(route("admin.cars.store"));
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextInput
        id="licensePlate"
        labelText="Placa del carro"
        placeholder="ABC-123"
        value={data.licensePlate}
        onChange={(e) => setData("licensePlate", e.target.value)}
        errors={errors.licensePlate}
        required
      />
      <SelectInput
        id="user_id"
        labelText="Chofer"
        value={data.user_id}
        onChange={(e) => setData("user_id", Number(e.target.value))}
        placeholder="Selecciona un usuario"
        errors={errors.user_id}
        required
      >
        {drivers.map((z) => (
          <SelectInput.Item value={z.id} key={z.id}>
            {z.fullname}
          </SelectInput.Item>
        ))}
      </SelectInput>
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

export default CarForm;
