import TruckForm from "@/Components/Admin/Forms/Truck";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar camión" />
      <TruckForm
        truck={props.truck}
        drivers={props.drivers}
        zones={props.zones}
      />
    </AdminLayout>
  );
}

export default Edit;
