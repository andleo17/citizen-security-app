import Sidebar from "@/Components/Admin/Sidebar";
import Navbar from "@/Components/App/Navbar";
import DriverIcon from "@/Icons/DriverIcon";
import ToggleSidebarIcon from "@/Icons/ToggleSidebarIcon";
import { PropsWithChildren } from "react";
import ToggleThemeButton from "@/Components/App/ToggleThemeButton";
import Menu from "@/Components/App/Menu";

function AdminLayout({ children, auth }: PropsWithChildren<any>) {
  return (
    <div className="bg-zinc-100 text-gray-900 dark:bg-[#020617] dark:text-white h-full flex transition-colors">
      <Sidebar>
        <Navbar
          sideBarButton={
            <Sidebar.Trigger>
              <span className="sr-only">Open sidebar</span>
              <ToggleSidebarIcon />
            </Sidebar.Trigger>
          }
        >
          <ToggleThemeButton />
          <Menu user={auth.user} />
        </Navbar>
        <Sidebar.Content>
          <Sidebar.Item href={route("admin.zones.index")} label="Zonas" />
          <Sidebar.Item href={route("admin.trucks.index")} label="Camiones" />
          <Sidebar.Item href={route("admin.reports.index")} label="Reportes" />
          <Sidebar.Item href={route("admin.users.index")} label="Usuarios" />
        </Sidebar.Content>
        <main className="p-4 ml-0 sm:ml-64 mt-16 overflow-y-auto w-full">
          {children}
        </main>
      </Sidebar>
    </div>
  );
}

export default AdminLayout;
