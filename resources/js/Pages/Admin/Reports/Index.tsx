import type { Paginable, Report, User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Common/Table";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Badge from "@/Components/Common/Badge";

dayjs.locale("es-mx");
dayjs.extend(relativeTime);

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
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Listado de reportes</h1>
      </div>

      {reports.data.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.Header>ID</Table.Header>
              <Table.Header>Descripción</Table.Header>
              <Table.Header>Ciudadano</Table.Header>
              <Table.Header>Categoría</Table.Header>
              <Table.Header>Estado</Table.Header>
              <Table.Header>Fecha</Table.Header>
              <Table.Header>
                <span className="sr-only">Editar</span>
              </Table.Header>
            </Table.Head>
            <Table.Body>
              {reports.data.map((r) => {
                const createdAt = dayjs(r.created_at);
                return (
                  <Table.Row
                    key={r.id}
                    className={`dark:border-gray-700 dark:bg-gray-800 ${
                      r.emergency &&
                      !r.state &&
                      "animate-pulse-emergency dark:animate-pulse-emergency-dark dark:text-white text-black"
                    }`}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1 text-center">
                      {r.id}
                    </Table.Cell>
                    <Table.Cell>{formatDescription(r.description)}</Table.Cell>
                    <Table.Cell>{r.user.fullname}</Table.Cell>
                    <Table.Cell>
                      <Badge
                        color={r.report_sub_category?.name ? "purple" : "gray"}
                        label={r.report_sub_category?.name || "Sin categoría"}
                      />
                      {r.emergency && <Badge color="red" label={"SOS"} />}
                    </Table.Cell>
                    <Table.Cell>
                      {r.state ? (
                        <Badge color="green" label="Atendido" />
                      ) : (
                        <Badge color="yellow" label="Pendiente" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        title={createdAt.format(
                          "dddd DD [de] MMMM [del] YYYY, hh:mm a"
                        )}
                      >
                        {createdAt.fromNow()}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap space-x-3 w-0">
                      <Table.EditButton
                        route={route("admin.reports.edit", r.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
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
