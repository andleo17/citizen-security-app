import type { Route, User, Zone } from "vendor";

import RouteForm from "@/Components/Admin/Forms/Route";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  route: Route;
  zones: Zone[];
}

function Edit({ auth, route, zones }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar ruta" />
      <RouteForm route_model={route} zones={zones} />
    </AdminLayout>
  );
}

export default Edit;
