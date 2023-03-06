import type { Car, User, Zone } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import PatrolForm from "@/Components/Admin/Forms/Patrol";

interface CreateProps {
  auth: { user: User };
  zones: Zone[];
  drivers: User[];
  cars: Car[];
}

function Create({ auth, zones, drivers, cars }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear patrulla" />
      <PatrolForm zones={zones} drivers={drivers} cars={cars} />
    </AdminLayout>
  );
}

export default Create;
