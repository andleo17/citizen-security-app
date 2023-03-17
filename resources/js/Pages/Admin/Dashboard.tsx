import type { User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

interface MainProps {
  auth: { user: User };
}

function Main({ auth }: MainProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Dashboard" />
      <h1>Dashboard</h1>
    </AdminLayout>
  );
}

export default Main;

