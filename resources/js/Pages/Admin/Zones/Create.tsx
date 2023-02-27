import ZoneForm from "@/Components/Admin/Forms/Zone";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Create(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Crear zona" />
      <ZoneForm />
    </AdminLayout>
  );
}

export default Create;
