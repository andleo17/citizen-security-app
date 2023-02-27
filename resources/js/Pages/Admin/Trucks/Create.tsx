import TruckForm from "@/Components/Admin/Forms/Truck";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Create(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Crear camión" />
      <TruckForm zones={props.zones} drivers={props.drivers} />
    </AdminLayout>
  );
}

export default Create;
