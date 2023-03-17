import type { Paginable, User } from "vendor";

import NavLink from "@/Components/Common/NavLink";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/Common/Table";
import Badge from "@/Components/Common/Badge";

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
      <div className="mb-5 flex justify-between items-center">
        <h1 className="font-bold text-2xl">Listado de usuarios</h1>
        <NavLink href={route("admin.users.create")} color="green">
          Agregar
        </NavLink>
      </div>
      <Table.Fallback showWhen={users.data.length > 0}>
        <Table paginationData={users}>
          <Table.Head>
            <Table.Header>ID</Table.Header>
            <Table.Header>DNI</Table.Header>
            <Table.Header>Nombre completo</Table.Header>
            <Table.Header>Rol</Table.Header>
            <Table.Header>Estado</Table.Header>
            <Table.Header>
              <span className="sr-only">Menú</span>
            </Table.Header>
          </Table.Head>
          <Table.Body>
            {users.data.map((u) => (
              <Table.Row
                key={u.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1 text-center">
                  {u.id}
                </Table.Cell>
                <Table.Cell>{u.dni}</Table.Cell>
                <Table.Cell>{u.fullname}</Table.Cell>
                <Table.Cell>
                  <Badge color="yellow" label={UserRole[u.role]} />
                </Table.Cell>
                <Table.Cell>
                  {u.deleted_at ? (
                    <Badge color="gray" label="Inactivo" />
                  ) : (
                    <Badge color="green" label="Activo" />
                  )}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap space-x-3 w-0">
                  <Table.EditButton route={route("admin.users.edit", u.id)} />
                  {auth.user.id !== u.id && (
                    <Table.DeleteButton
                      route={route("admin.users.destroy", u.id)}
                    />
                  )}
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
