import type { User } from "vendor";

import UserForm from "@/Components/Admin/Forms/User";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  user: User;
}

function Edit({ auth, user }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar usuario" />
      <UserForm user={user} />
    </AdminLayout>
  );
}

export default Edit;
