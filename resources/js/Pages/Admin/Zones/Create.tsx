import type { User } from "vendor";

import ZoneForm from "@/Components/Admin/Forms/Zone";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface CreateProps {
  auth: { user: User };
}

function Create({ auth }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear zona" />
      <ZoneForm />
    </AdminLayout>
  );
}

export default Create;
