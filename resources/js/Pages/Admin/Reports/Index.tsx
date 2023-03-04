import type { Report, User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "flowbite-react";

interface IndexProps {
  auth: { user: User };
  reports: Report[];
}

function formatDescription(description: string) {
  if (description.length < 40) return description;

  return description.slice(0, 40) + "...";
}

function Index({ auth, reports }: IndexProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de reportes" />
      <h1 className="font-bold text-2xl mb-5">Listado de reportes</h1>
      {reports.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Descripción</Table.HeadCell>
            <Table.HeadCell>Ciudadano</Table.HeadCell>
            <Table.HeadCell>Categoría</Table.HeadCell>
            <Table.HeadCell>Importante</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {reports.map((r) => (
              <Table.Row
                key={r.id}
                className={`dark:border-gray-700 dark:bg-gray-800 ${
                  r.emergency &&
                  !r.state &&
                  "animate-pulse-emergency dark:animate-pulse-emergency-dark dark:text-white text-black"
                }`}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {r.id}
                </Table.Cell>
                <Table.Cell>{formatDescription(r.description)}</Table.Cell>
                <Table.Cell>{r.user.fullname}</Table.Cell>
                <Table.Cell>
                  {r.report_sub_category?.name || "Sin categoría"}
                </Table.Cell>
                <Table.Cell>{r.emergency ? "Sí" : "No"}</Table.Cell>
                <Table.Cell>{r.state ? "Atendido" : "Pendiente"}</Table.Cell>
                <Table.Cell>{r.created_at}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={route("admin.reports.edit", r.id)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Editar
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div>
          <p>No se encuentran datos</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default Index;
