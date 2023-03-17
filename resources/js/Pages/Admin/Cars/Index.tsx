import type { Car, Paginable, User } from "vendor";

import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/Common/Table";

interface IndexProps {
  auth: { user: User };
  cars: Paginable<Car>;
}

function Index({ auth, cars }: IndexProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de carros" />
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Listado de carros</h1>
        <NavLink href={route("admin.cars.create")} color="green">
          Agregar
        </NavLink>
      </div>
      <Table.Fallback showWhen={cars.data.length > 0}>
        <Table paginationData={cars}>
          <Table.Head>
            <Table.Header>ID</Table.Header>
            <Table.Header>Placa</Table.Header>
            <Table.Header>
              <span className="sr-only">Menú</span>
            </Table.Header>
          </Table.Head>
          <Table.Body>
            {cars.data.map((z) => (
              <Table.Row
                key={z.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1 text-center">
                  {z.id}
                </Table.Cell>
                <Table.Cell>{z.licensePlate}</Table.Cell>
                <Table.Cell className="whitespace-nowrap space-x-3 w-0">
                  <Table.EditButton route={route("admin.cars.edit", z.id)} />
                  <Table.DeleteButton
                    route={route("admin.cars.destroy", z.id)}
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
