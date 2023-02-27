import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "flowbite-react";

function Index({ auth, trucks }: any) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de camiones" />
      <h1 className="font-bold text-2xl mb-5">Listado de camiones</h1>
      <div className="my-5">
        <NavLink href={route("admin.trucks.create")} color="green">
          Agregar
        </NavLink>
      </div>
      {trucks.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Placa</Table.HeadCell>
            <Table.HeadCell>Zona</Table.HeadCell>
            <Table.HeadCell>Chofer</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Eliminar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {trucks.map((z: any) => (
              <Table.Row
                key={z.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {z.id}
                </Table.Cell>
                <Table.Cell>{z.licensePlate}</Table.Cell>
                <Table.Cell>{z.zone?.name || "Sin zona asignada"}</Table.Cell>
                <Table.Cell>{z.user?.fullname || "Sin conductor"}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={route("admin.trucks.edit", z.id)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Editar
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={route("admin.trucks.destroy", z.id)}
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
      ) : (
        <div>
          <p>No se encuentran datos</p>
        </div>
      )}
    </AdminLayout>
  );
}

export default Index;
