import NavLink from "@/Components/Common/NavLink";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";

function AppNotReady(props: any) {
  return (
    <AppLayout auth={props.auth}>
      <Head title="Pendiente de configuración" />
      <main className="p-4 flex justify-center items-center flex-col h-full text-center">
        <h1 className="font-bold text-xl">
          La aplicación aún no está configurada
        </h1>
        <p className="my-5">
          Por favor inicia sesión como administrador y configura la aplicación
          dando clic al botón de abajo.
        </p>
        <NavLink href={route("admin.dashboard")} color="green">
          Configurar
        </NavLink>
      </main>
    </AppLayout>
  );
}

export default AppNotReady;
