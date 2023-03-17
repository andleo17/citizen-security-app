import type { User } from "vendor";

import UserForm from "@/Components/Admin/Forms/User";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface CreateProps {
  auth: { user: User };
}

function Create({ auth }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear usuario" />
      <UserForm />
    </AdminLayout>
  );
}

export default Create;

