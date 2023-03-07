import type { Patrol, User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import NavLink from "@/Components/Common/NavLink";
import { Table } from "flowbite-react";
import PatrolItem from "@/Components/Admin/Items/PatrolItem";

interface IndexProps {
  auth: { user: User };
  patrolsInDay: Patrol[];
}

function Index({ auth, patrolsInDay }: IndexProps) {
  const [patrols, setPatrols] = useState(patrolsInDay);

  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de patrullas" />
      <h1 className="font-bold text-2xl mb-5">Patrullas</h1>
      <div className="my-5">
        <NavLink href={route("admin.patrols.create")} color="green">
          Agregar
        </NavLink>
      </div>
      {patrols.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {patrols.map((p) => (
            <PatrolItem key={p.id} patrol={p} />
          ))}
        </div>
      ) : (
        <span>No se encuentran patrullas el día de hoy</span>
      )}
    </AdminLayout>
  );
}

export default Index;
