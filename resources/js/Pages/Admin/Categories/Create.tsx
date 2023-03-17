import type { User } from "vendor";

import { Head } from "@inertiajs/react";
import CategoryForm from "@/Components/Admin/Forms/Category";
import AdminLayout from "@/Layouts/AdminLayout";

interface CreateProps {
  auth: { user: User };
}

function Create({ auth }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear categoría" />
      <CategoryForm />
    </AdminLayout>
  );
}

export default Create;
