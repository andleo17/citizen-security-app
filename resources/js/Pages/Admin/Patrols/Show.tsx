import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import type { Patrol, User } from "vendor";

interface ShowProps {
  auth: { user: User };
  patrol: Patrol;
}

function Show({ auth, patrol }: ShowProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Detalle de la patrulla" />
      <code>{JSON.stringify(patrol)}</code>
    </AdminLayout>
  );
}

export default Show;
