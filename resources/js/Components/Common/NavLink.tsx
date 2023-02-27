import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";

interface NavLinkProps {
  href: string;
  color?: string;
}

export default function NavLink({
  href,
  color = "blue",
  children,
}: PropsWithChildren<NavLinkProps>) {
  return (
    <Link
      href={href}
      className={`text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none bg-${color}-700 hover:bg-${color}-800 focus:ring-${color}-300 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
    >
      {children}
    </Link>
  );
}
