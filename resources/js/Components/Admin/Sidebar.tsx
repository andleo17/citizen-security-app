import { Link } from "@inertiajs/react";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface ItemProps {
  href: string;
  label: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: null,
  toggleOpen: null,
});

function Item({ href, label, icon }: ItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex gap-2 items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {icon && icon(null)}
        <span>{label}</span>
      </Link>
    </li>
  );
}

function Sidebar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((previouseState) => !previouseState);
  };

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function Content({ children }: PropsWithChildren) {
  const { open, setOpen } = useContext(SidebarContext);
  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700${
          !open ? " -translate-x-full" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2">{children}</ul>
        </div>
      </aside>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-gray-800 bg-opacity-70"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function Trigger({ children }: PropsWithChildren) {
  const { toggleOpen } = useContext(SidebarContext);

  return (
    <button
      type="button"
      className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={() => toggleOpen()}
    >
      {children}
    </button>
  );
}

Sidebar.Item = Item;
Sidebar.Trigger = Trigger;
Sidebar.Content = Content;

export default Sidebar;
