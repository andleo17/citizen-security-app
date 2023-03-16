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
      <h1 className="font-bold text-2xl mb-5">Listado de carros</h1>
      <div className="my-5">
        <NavLink href={route("admin.cars.create")} color="green">
          Agregar
        </NavLink>
      </div>
      {cars.data.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.Header>ID</Table.Header>
              <Table.Header>Placa</Table.Header>
              <Table.Header>
                <span className="sr-only">Editar</span>
              </Table.Header>
              <Table.Header>
                <span className="sr-only">Eliminar</span>
              </Table.Header>
            </Table.Head>
            <Table.Body>
              {cars.data.map((z) => (
                <Table.Row
                  key={z.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{z.id}</Table.Cell>
                  <Table.Cell>{z.licensePlate}</Table.Cell>
                  <Table.Cell>
                    <Link
                      href={route("admin.cars.edit", z.id)}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Editar
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      href={route("admin.cars.destroy", z.id)}
                      className="font-medium text-red-600 hover:underline dark:text-red-500"
                      method={"delete"}
                      as="button"
                    >
                      Eliminar
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Table.Pagination info={cars} />
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
