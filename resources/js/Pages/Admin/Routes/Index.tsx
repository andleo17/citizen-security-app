import NavLink from "@/Components/Common/NavLink";
import Table from "@/Components/Common/Table";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import type { Paginable, Route, User } from "vendor";

interface IndexProps {
  auth: { user: User };
  routes: Paginable<Route>;
}

function Index({ auth, routes }: IndexProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de rutas" />
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Lista de rutas</h1>
        <NavLink href={route("admin.routes.create")} color="green">
          Agregar
        </NavLink>
      </div>
      <Table.Fallback showWhen={routes.data.length > 0}>
        <Table paginationData={routes}>
          <Table.Head>
            <Table.Header>ID</Table.Header>
            <Table.Header>Nombre</Table.Header>
            <Table.Header>Zona</Table.Header>
            <Table.Header>
              <span className="sr-only">Menú</span>
            </Table.Header>
          </Table.Head>
          <Table.Body>
            {routes.data.map((r) => (
              <Table.Row
                key={r.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1 text-center">
                  {r.id}
                </Table.Cell>
                <Table.Cell>{r.name}</Table.Cell>
                <Table.Cell>{r.zone.name}</Table.Cell>
                <Table.Cell className="whitespace-nowrap space-x-3 w-0">
                  <Table.EditButton route={route("admin.routes.edit", r.id)} />
                  <Table.DeleteButton
                    route={route("admin.routes.destroy", r.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Fallback>
    </AdminLayout>
  );
}

export default Index;
