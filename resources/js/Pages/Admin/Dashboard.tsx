import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Main(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Dashboard" />
      <h1>Dashboard</h1>
    </AdminLayout>
  );
}

export default Main;
