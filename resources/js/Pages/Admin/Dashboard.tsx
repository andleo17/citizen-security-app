import type { User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Card from "@/Components/Common/Card";

interface MainProps {
  auth: { user: User };
  reports: number;
  reportsByDay: number;
}

function Main({ auth, ...data }: MainProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Dashboard" />
      <div className="grid grid-cols-4 gap-2">
        <Card>
          <Card.Title>Reportes recibidos en total</Card.Title>
          <Card.Body>
            <span className="text-4xl font-bold">{data.reports}</span>
          </Card.Body>
        </Card>
        <Card>
          <Card.Title>Reportes recibidos hoy</Card.Title>
          <Card.Body>
            <span className="text-4xl font-bold">{data.reportsByDay}</span>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default Main;
