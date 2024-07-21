import { Link } from "@inertiajs/react";
import { PropsWithChildren, isValidElement } from "react";
import { Paginable } from "vendor";

interface TableProps {
  paginationData?: Omit<Paginable, "data">;
}

interface RowProps {
  className?: string;
}

interface PaginationProps {
  info?: Omit<Paginable, "data">;
}

interface ButtonProps {
  route: string;
}

interface FallbackProps {
  showWhen: boolean;
}

function Head({ children }: PropsWithChildren) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>{children}</tr>
    </thead>
  );
}

function Header({ children }: PropsWithChildren) {
  return (
    <th scope="col" className="px-6 py-3">
      {children}
    </th>
  );
}

function Body({ children }: PropsWithChildren) {
  return <tbody>{children}</tbody>;
}

function Row({ className, children }: PropsWithChildren<RowProps>) {
  return (
    <tr
      className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${className}`}
    >
      {children}
    </tr>
  );
}

function Cell({ children, className }: PropsWithChildren<RowProps>) {
  return <td className={`px-6 py-4 ${className}`}>{children}</td>;
}

function EditButton({ route }: ButtonProps) {
  return (
    <Link
      href={route}
      className="rounded bg-yellow-400 dark:bg-yellow-600 p-1.5"
      as="button"
      title="Editar"
    >
      <span className="sr-only">Editar</span>
      <svg
        className="w-5 h-5 fill-white"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <polygon points="263.75,145.68 43.5,365.92 43.5,466.5 152.04,466.5 368.31,250.23 " />
        <path d="M458.07,139.61l-83.7-83.69c-5.76-5.76-15.1-5.76-20.86,0l-67.13,67.13l104.56,104.55l67.13-67.13 C463.83,154.71,463.83,145.37,458.07,139.61z" />
      </svg>
    </Link>
  );
}

function DeleteButton({ route }: ButtonProps) {
  return (
    <Link
      href={route}
      className="rounded bg-red-700 dark:bg-red-800 p-1.5"
      as="button"
      title="Eliminar"
    >
      <span className="sr-only">Eliminar</span>
      <svg
        className="w-5 h-5 fill-gray-100 dark:fill-gray-300"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M388.31,110.71h-63.59C323.89,73.51,293.39,43.5,256,43.5s-67.89,30.01-68.72,67.21h-63.59 c-24.34,0-44.08,19.73-44.08,44.08v1.25c0,24.34,19.73,44.08,44.08,44.08h264.61c24.34,0,44.08-19.73,44.08-44.08v-1.25 C432.38,130.44,412.65,110.71,388.31,110.71z M256,75.05c19.99,0,36.35,15.86,37.16,35.66h-74.33 C219.65,90.91,236.01,75.05,256,75.05z" />
        <path d="M123.7,231.66c-1.49,0-2.97-0.04-4.43-0.13v183.29c0,29.64,24.03,53.67,53.67,53.67h166.11 c29.64,0,53.67-24.03,53.67-53.67V231.54c-1.46,0.09-2.94,0.13-4.43,0.13H123.7z M230.95,409.91c0,8.71-7.07,15.78-15.78,15.78 c-8.72,0-15.78-7.07-15.78-15.78V294.28c0-8.72,7.06-15.78,15.78-15.78c8.71,0,15.78,7.06,15.78,15.78V409.91z M312.6,409.91 c0,8.71-7.06,15.78-15.78,15.78c-8.71,0-15.78-7.07-15.78-15.78V294.28c0-8.72,7.07-15.78,15.78-15.78 c8.72,0,15.78,7.06,15.78,15.78V409.91z" />
      </svg>
    </Link>
  );
}

function Pagination({ info }: PaginationProps) {
  return (
    <nav
      className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-900"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        {"Mostrando "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {info.from} - {info.to}
        </span>
        {" de "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {info.total}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <Link
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
              info.prev_page_url &&
              "dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-700"
            }`}
            href={info.prev_page_url}
            disabled={!info.prev_page_url}
            as="button"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        {info.links.slice(1, -1).map((l, i) => (
          <li key={i}>
            <Link
              href={l.url}
              className={
                l.active
                  ? "block z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={info.next_page_url}
            as="button"
            disabled={!info.next_page_url}
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${
              info.next_page_url &&
              "dark:hover:bg-gray-700 dark:hover:text-white hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Fallback({ showWhen, children }: PropsWithChildren<FallbackProps>) {
  if (showWhen && isValidElement(children)) return children;

  return (
    <div className="mt-14 mb-4 text-center text-xl font-bold">
      No se encontraron datos 😓
    </div>
  );
}

function Table({ paginationData, children }: PropsWithChildren<TableProps>) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
      {paginationData && <Pagination info={paginationData} />}
    </div>
  );
}

Table.Head = Head;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.EditButton = EditButton;
Table.DeleteButton = DeleteButton;
Table.Pagination = Pagination;
Table.Fallback = Fallback;

export default Table;
