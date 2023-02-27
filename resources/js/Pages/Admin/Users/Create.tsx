import UserForm from "@/Components/Admin/Forms/User";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Create(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Crear usuario" />
      <UserForm />
    </AdminLayout>
  );
}

export default Create;
