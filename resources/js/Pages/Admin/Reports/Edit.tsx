import ReportForm from "@/Components/Admin/Forms/Report";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar reporte" />
      <ReportForm report={props.report} categories={props.categories} />
    </AdminLayout>
  );
}

export default Edit;

