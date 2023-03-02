import CarForm from "@/Components/Admin/Forms/Car";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar carro" />
      <CarForm car={props.car} drivers={props.drivers} />
    </AdminLayout>
  );
}

export default Edit;
