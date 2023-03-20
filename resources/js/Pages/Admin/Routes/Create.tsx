import type { User, Zone } from "vendor";

import RouteForm from "@/Components/Admin/Forms/Route";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface CreateProps {
  auth: { user: User };
  zones: Zone[];
}

function Create({ auth, zones }: CreateProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Crear ruta" />
      <RouteForm zones={zones} />
    </AdminLayout>
  );
}

export default Create;
