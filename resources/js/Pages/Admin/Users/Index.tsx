import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Table } from "flowbite-react";

const UserRole: Record<string, string> = {
  Citizen: "Ciudadano",
  Driver: "Conductor",
  Admin: "Administrador",
};

function Index({ auth, users }: any) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de usuarios" />
      <h1 className="font-bold text-2xl mb-5">Listado de usuarios</h1>
      <div className="my-5">
        <NavLink href={route("admin.users.create")} color="green">
          Agregar
        </NavLink>
      </div>
      {users.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>DNI</Table.HeadCell>
            <Table.HeadCell>Nombre completo</Table.HeadCell>
            <Table.HeadCell>Rol</Table.HeadCell>
            <Table.HeadCell>Estado</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Editar</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Eliminar</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((u: any) => (
              <Table.Row
                key={u.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {u.id}
                </Table.Cell>
                <Table.Cell>{u.dni}</Table.Cell>
                <Table.Cell>{u.fullname}</Table.Cell>
                <Table.Cell>{UserRole[u.role]}</Table.Cell>
                <Table.Cell>{u.state ? "Activo" : "Inactivo"}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={route("admin.users.edit", u.id)}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Editar
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={route("admin.users.destroy", u.id)}
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
