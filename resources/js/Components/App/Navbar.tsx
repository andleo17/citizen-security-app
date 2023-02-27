import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

interface NavbarProps {
  sideBarButton?: JSX.Element;
}

function Navbar({ children, sideBarButton }: PropsWithChildren<NavbarProps>) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {sideBarButton}
            <Link href={route("index")} className="ml-2">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                {import.meta.env.VITE_APP_NAME}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-0 sm:gap-2">{children}</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
