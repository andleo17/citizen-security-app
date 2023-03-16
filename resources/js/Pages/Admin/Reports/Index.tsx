import type { Paginable, Report, User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/Common/Table";

interface IndexProps {
  auth: { user: User };
  reports: Paginable<Report>;
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
      {reports.data.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.Header>ID</Table.Header>
              <Table.Header>Descripción</Table.Header>
              <Table.Header>Ciudadano</Table.Header>
              <Table.Header>Categoría</Table.Header>
              <Table.Header>Importante</Table.Header>
              <Table.Header>Estado</Table.Header>
              <Table.Header>Fecha</Table.Header>
              <Table.Header>
                <span className="sr-only">Editar</span>
              </Table.Header>
            </Table.Head>
            <Table.Body>
              {reports.data.map((r) => (
                <Table.Row
                  key={r.id}
                  className={`dark:border-gray-700 dark:bg-gray-800 ${
                    r.emergency &&
                    !r.state &&
                    "animate-pulse-emergency dark:animate-pulse-emergency-dark dark:text-white text-black"
                  }`}
                >
                  <Table.Cell>{r.id}</Table.Cell>
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
          <Table.Pagination info={reports} />
        </>
      ) : (
        <div>
          <p>No se encuentran datos</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default Index;
