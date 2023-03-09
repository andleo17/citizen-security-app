import type { Patrol, User } from "vendor";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import NavLink from "@/Components/Common/NavLink";
import PatrolItem from "@/Components/Admin/Items/PatrolItem";
import DatePicker from "@/Components/Common/Forms/Datepicker";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

interface IndexProps {
  auth: { user: User };
  patrolsInDay: Patrol[];
}

function patrolsNotFoundMessage(date?: Date) {
  let message = "No se encuentran patrullas para el día ";

  if (!date || new Date().toDateString() === date.toDateString()) {
    return (message += "de hoy");
  }

  message += dayjs(date).format("DD-MM-YYYY");

  return message;
}

async function getPatrolsByDate(date: Date) {
  const { data } = await axios.post(route("patrols.filter"), {
    date,
  });

  return data;
}

function Index({ auth, patrolsInDay }: IndexProps) {
  const [patrols, setPatrols] = useState(patrolsInDay);
  const [filterDate, setFilterDate] = useState<Date>();

  useEffect(() => {
    if (!filterDate) return;

    getPatrolsByDate(filterDate).then((data) => setPatrols(data));
  }, [filterDate]);

  return (
    <AdminLayout auth={auth}>
      <Head title="Lista de patrullas" />
      <h1 className="font-bold text-2xl mb-5">Patrullas</h1>
      <div className="w-full md:w-1/3">
        <DatePicker
          id="filterDate"
          labelText="Fecha de búsqueda"
          value={dayjs(filterDate || new Date()).format(dateFormat)}
          onChange={(e) =>
            setFilterDate(
              dayjs(e.target.value || new Date(), dateFormat).toDate()
            )
          }
        />
      </div>
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
        <span>{patrolsNotFoundMessage(filterDate)}</span>
      )}
    </AdminLayout>
  );
}

export default Index;
