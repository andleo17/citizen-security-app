import CarForm from "@/Components/Admin/Forms/Car";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Create(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Crear carro" />
      <CarForm drivers={props.drivers} />
    </AdminLayout>
  );
}

export default Create;
