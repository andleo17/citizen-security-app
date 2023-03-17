import type { ReportCategory, User } from "vendor";

import CategoryForm from "@/Components/Admin/Forms/Category";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface EditProps {
  auth: { user: User };
  category: ReportCategory;
}

function Edit({ auth, category }: EditProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Editar categoría" />
      <CategoryForm category={category} />
    </AdminLayout>
  );
}

export default Edit;
