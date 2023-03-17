import type { User } from "vendor";

import CarForm from "@/Components/Admin/Forms/Car";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface CreateProps {
  auth: { user: User };
}

function Create({ auth }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear carro" />
      <CarForm />
    </AdminLayout>
  );
}

export default Create;
