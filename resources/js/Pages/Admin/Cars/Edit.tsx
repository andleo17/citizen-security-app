import type { Car, User } from "vendor";

import CarForm from "@/Components/Admin/Forms/Car";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  car: Car;
}

function Edit({ auth, car }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar carro" />
      <CarForm car={car} />
    </AdminLayout>
  );
}

export default Edit;
