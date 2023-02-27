import ZoneForm from "@/Components/Admin/Forms/Zone";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar zona" />
      <ZoneForm zone={props.zone} />
    </AdminLayout>
  );
}

export default Edit;
