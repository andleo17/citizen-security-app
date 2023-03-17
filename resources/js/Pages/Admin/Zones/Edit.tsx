import type { User, Zone } from "vendor";

import ZoneForm from "@/Components/Admin/Forms/Zone";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  zone: Zone;
}

function Edit({ auth, zone }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar zona" />
      <ZoneForm zone={zone} />
    </AdminLayout>
  );
}

export default Edit;
