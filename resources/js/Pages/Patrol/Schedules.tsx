import type { Car, User } from "vendor";

import Modal from "@/Components/Common/Modal";
import NavLink from "@/Components/Common/NavLink";
import SearchIcon from "@/Icons/SearchIcon";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Label, TextInput } from "flowbite-react";
import { FormEventHandler, useEffect, useState } from "react";

interface ChangeCarProps {
  auth: { user: User };
  cars: Car[];
}

function ChangeCar({ auth, cars }: ChangeCarProps) {
  const [isOpen, setOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [filteredCars, setFilteredCars] = useState(cars);
  const { data, setData, put } = useForm({
    carId: -1,
    licensePlate: "",
  });

  useEffect(() => {
    setFilteredCars(
      cars.filter((t) =>
        t.licensePlate.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  }, [searchFilter]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    put(route("driver.car.update", data.carId));
  };

  if (cars.length === 0) {
    return (
      <AppLayout auth={auth}>
        <Head title="Cambiar camión" />
        <div className="flex flex-col items-center mt-5 gap-6">
          <p className="font-bold text-2xl text-center">
            Actualmente no hay carros disponibles
          </p>
          <NavLink href={route("driver.location")}>Regresar</NavLink>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout auth={auth}>
      <Head title="Cambiar carro" />
      <div>
        <Label id="search-filter" className="sr-only" value="Buscar carro" />
        <TextInput
          icon={SearchIcon}
          type="search"
          id="search-filter"
          placeholder="Buscar carro por placa"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <ul className="w-full text-gray-900 dark:text-white mt-4">
        {filteredCars.map((t) => (
          <li
            key={t.id}
            className="px-4 py-2 border rounded-lg my-2 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-600 border-gray-200 cursor-pointer"
            data-modal-target="popup-modal"
            data-modal-show="popup-modal"
            onClick={() => {
              setOpen(true);
              setData({ carId: t.id, licensePlate: t.licensePlate });
            }}
          >
            <span>{t.licensePlate}</span>
            <p className="font-semibold">
              Zona: {t.licensePlate || "Sin asignar"}
            </p>
          </li>
        ))}
      </ul>
      <Modal show={isOpen} onClose={() => setOpen(false)} maxWidth="md">
        <div className="text-center py-4 px-3">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            ¿Estás seguro de cambiar a este carro?
          </h3>
          <p className="text-black dark:text-white font-bold mb-6">
            {data.licensePlate}
          </p>
          <div className="flex justify-center gap-4">
            <form onSubmit={handleSubmit}>
              <Button
                color="success"
                type="submit"
                data-modal-hide="popup-modal"
              >
                Sí, seguro
              </Button>
            </form>
            <Button color="gray" data-modal-hide="popup-modal">
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}

export default ChangeCar;
