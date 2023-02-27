import CategoryForm from "@/Components/Admin/Forms/Category";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Edit(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Editar categoría" />
      <CategoryForm category={props.category} />
    </AdminLayout>
  );
}

export default Edit;
