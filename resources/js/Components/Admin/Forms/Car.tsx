import type { FormEvent } from "react";
import type { Car } from "vendor";

import TextInput from "@/Components/Common/Forms/TextInput";
import { useForm } from "@inertiajs/react";
import { Button } from "flowbite-react";

interface CarProps {
  car?: Car;
}

function useCarForm(car: Car) {
  const { data, setData, post, processing, errors, put } = useForm({
    licensePlate: car?.licensePlate || "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (car) {
      put(route("admin.cars.update", { id: car.id }));
    } else {
      post(route("admin.cars.store"));
    }
  }

  return { data, setData, processing, errors, handleSubmit };
}

function CarForm({ car }: CarProps) {
  const { data, setData, errors, processing, handleSubmit } = useCarForm(car);

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
      <Button type="submit" disabled={processing}>
        Guardar
      </Button>
    </form>
  );
}

export default CarForm;
