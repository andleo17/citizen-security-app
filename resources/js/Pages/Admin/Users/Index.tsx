import type { Paginable, User } from "vendor";

import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/Common/Table";

interface IndexProps {
  auth: { user: User };
  users: Paginable<User>;
}

const UserRole: Record<string, string> = {
  Citizen: "Ciudadano",
  Police: "Policía",
  Admin: "Administrador",
};

function Index({ auth, users }: IndexProps) {
  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de usuarios" />
      <h1 className="font-bold text-2xl mb-5">Listado de usuarios</h1>
      <div className="my-5">
        <NavLink href={route("admin.users.create")} color="green">
          Agregar
        </NavLink>
      </div>
      {users.data.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.Header>ID</Table.Header>
              <Table.Header>DNI</Table.Header>
              <Table.Header>Nombre completo</Table.Header>
              <Table.Header>Rol</Table.Header>
              <Table.Header>Estado</Table.Header>
              <Table.Header>
                <span className="sr-only">Editar</span>
              </Table.Header>
              <Table.Header>
                <span className="sr-only">Eliminar</span>
              </Table.Header>
            </Table.Head>
            <Table.Body>
              {users.data.map((u) => (
                <Table.Row
                  key={u.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{u.id}</Table.Cell>
                  <Table.Cell>{u.dni}</Table.Cell>
                  <Table.Cell>{u.fullname}</Table.Cell>
                  <Table.Cell>{UserRole[u.role]}</Table.Cell>
                  <Table.Cell>
                    {u.deleted_at ? "Inactivo" : "Activo"}
                  </Table.Cell>
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
          <Table.Pagination info={users} />
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
