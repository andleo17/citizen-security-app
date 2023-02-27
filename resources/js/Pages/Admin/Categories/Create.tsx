import CategoryForm from "@/Components/Admin/Forms/Category";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

function Create(props: any) {
  return (
    <AdminLayout auth={props.auth}>
      <Head title="Crear categoría" />
      <CategoryForm />
    </AdminLayout>
  );
}

export default Create;
