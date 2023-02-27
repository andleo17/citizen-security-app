import type { Method } from "@inertiajs/core";

import * as React from "react";
import { Link } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

interface DropDownContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
}

const DropDownContext = React.createContext<DropDownContextType>({
  open: false,
  setOpen: null,
  toggleOpen: null,
});

const Dropdown = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className="relative">{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }: React.PropsWithChildren) => {
  const { open, setOpen, toggleOpen } = React.useContext(DropDownContext);

  return (
    <>
      <div onClick={toggleOpen}>{children}</div>

      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </>
  );
};

interface ContentProps {
  align?: "right" | "left";
  width?: number;
  contentClasses?: string;
}

const Content = ({
  align = "right",
  width = 48,
  contentClasses = "py-1 bg-white dark:bg-gray-700",
  children,
}: React.PropsWithChildren<ContentProps>) => {
  const { open, setOpen } = React.useContext(DropDownContext);

  let alignmentClasses = "origin-top";

  if (align === "left") {
    alignmentClasses = "origin-top-left left-0";
  } else if (align === "right") {
    alignmentClasses = "origin-top-right right-0";
  }

  let widthClasses = "";

  if (width === 48) {
    widthClasses = "w-48";
  }

  return (
    <Transition
      as={React.Fragment}
      show={open}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={
            `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses
          }
        >
          {children}
        </div>
      </div>
    </Transition>
  );
};

interface DropdownLinkProps {
  href: string;
  method?: Method;
  as?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const DropdownLink = ({
  href,
  method,
  as,
  icon,
  children,
}: React.PropsWithChildren<DropdownLinkProps>) => {
  return (
    <Link
      href={href}
      method={method}
      as={as}
      className="flex gap-2 w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
    >
      {icon && icon(null)}
      {children}
    </Link>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
