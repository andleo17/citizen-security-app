import NavLink from "../Common/NavLink";
import Dropdown from "../Common/Dropdown";
import DriverIcon from "@/Icons/DriverIcon";
import AdminIcon from "@/Icons/AdminIcon";
import UserIcon from "@/Icons/UserIcon";
import MapIcon from "@/Icons/MapIcon";

function Menu({ user }: any) {
  if (!user) return <NavLink href={route("login")}>Iniciar sesión</NavLink>;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          className="flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
        >
          <span className="inline sm:hidden">Menú</span>
          <span className="hidden sm:inline">{user.fullname}</span>
          <svg
            className="ml-2 -mr-0.5 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Link href={route("profile.edit")} icon={UserIcon}>
          Perfil
        </Dropdown.Link>
        {user.role !== "Citizen" && (
          <Dropdown.Link href={route("watch")} icon={MapIcon}>
            Mapa
          </Dropdown.Link>
        )}
        {user.role !== "Citizen" && (
          <Dropdown.Link href={route("driver.location")} icon={DriverIcon}>
            Conductor
          </Dropdown.Link>
        )}
        {user.role === "Admin" && (
          <Dropdown.Link href={route("admin.dashboard")} icon={AdminIcon}>
            Administrador
          </Dropdown.Link>
        )}
        <Dropdown.Link href={route("logout")} method={"post"} as="button">
          Cerrar sesión
        </Dropdown.Link>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default Menu;
