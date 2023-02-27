import UserForm from "@/Components/Admin/Forms/User";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar usuario" />
      <UserForm user={props.user} />
    </AdminLayout>
  );
}

export default Edit;
