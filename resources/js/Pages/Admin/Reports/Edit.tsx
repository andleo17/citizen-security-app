import type { Report, ReportCategory, User } from "vendor";

import ReportForm from "@/Components/Admin/Forms/Report";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  report: Report;
  categories: ReportCategory[];
}

function Edit({ auth, report, categories }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar reporte" />
      <ReportForm report={report} categories={categories} />
    </AdminLayout>
  );
}

export default Edit;
