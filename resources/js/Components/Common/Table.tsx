import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Paginable } from "vendor";

interface RowProps {
  className?: string;
}

interface PaginationProps {
  info?: Omit<Paginable, "data">;
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

function Cell({ children }: PropsWithChildren) {
  return <td className="px-6 py-4">{children}</td>;
}

function Pagination({ info }: PaginationProps) {
  return (
    <nav
      className="flex items-center justify-between pt-4"
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
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
        {info.links.slice(1, -1).map((l) => (
          <li>
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
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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

function Table({ children }: PropsWithChildren) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

Table.Head = Head;
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.Pagination = Pagination;

export default Table;
