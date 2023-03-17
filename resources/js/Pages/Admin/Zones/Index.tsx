import type { Paginable, User, Zone } from "vendor";

import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Common/Table";

interface IndexProps {
  auth: { user: User };
  zones: Paginable<Zone>;
}

function Index({ auth, zones }: IndexProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de zonas" />
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Listado de zonas</h1>
        <NavLink href={route("admin.zones.create")} color="green">
          Agregar
        </NavLink>
      </div>
      <Table.Fallback showWhen={zones.data.length > 0}>
        <Table paginationData={zones}>
          <Table.Head>
            <Table.Header>ID</Table.Header>
            <Table.Header>Nombre</Table.Header>
            <Table.Header>
              <span className="sr-only">Menú</span>
            </Table.Header>
          </Table.Head>
          <Table.Body>
            {zones.data.map((z) => (
              <Table.Row
                key={z.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1 text-center">
                  {z.id}
                </Table.Cell>
                <Table.Cell>{z.name}</Table.Cell>
                <Table.Cell className="whitespace-nowrap space-x-3 w-0">
                  <Table.EditButton route={route("admin.zones.edit", z.id)} />
                  <Table.DeleteButton
                    route={route("admin.zones.destroy", z.id)}
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
