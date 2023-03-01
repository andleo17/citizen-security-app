import { Report } from "vendor";

interface ReportItemProps {
  report: Report;
}

function CheckIcon() {
  return (
    <svg
      className="fill-gray-100 dark:fill-gray-200"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className="stroke-green-400 dark:stroke-green-800"
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          strokeWidth="2"
        />
        <path
          d="M9 12L10.6828 13.6828V13.6828C10.858 13.858 11.142 13.858 11.3172 13.6828V13.6828L15 10"
          className="stroke-green-400 dark:stroke-green-800"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="fill-gray-100 dark:fill-gray-200"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className="stroke-yellow-400 dark:stroke-yellow-500"
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          strokeWidth="2"
        />
        <path
          className="stroke-yellow-400 dark:stroke-yellow-500"
          d="M12 8L12 13"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="stroke-yellow-400 dark:stroke-yellow-500"
          d="M12 16V15.9888"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function ReportItem({ report }: ReportItemProps) {
  return (
    <article className="rounded bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <header className="px-4 py-3 rounded-t border-b border-b-black dark:border-b-gray-300 flex justify-between items-center">
        <b>Código: {report.id}</b>
        {report.report_sub_category && (
          <span className="rounded bg-gray-300 dark:bg-gray-600 text-sm text-gray-700 dark:text-white font-semibold px-3 py-1">
            {report.report_sub_category.name}
          </span>
        )}
      </header>
      <div className="flex">
        <div className="row-span-2 flex flex-col items-center px-5 py-2">
          {report.state ? <CheckIcon /> : <WarningIcon />}
          <span className="text-sm font-bold">
            {report.state ? "Atendido" : "Pendiente"}
          </span>
          {report.emergency && (
            <span className="border-2 border-red-800 bg-red-600 px-3 py-1 rounded-2xl text-xs font-bold text-white mt-2">
              SOS
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <p className="flex-grow p-2">{report.description}</p>
          <div className="text-sm p-2">
            <p>
              <b>Fecha de creación:</b>{" "}
              {new Date(report.created_at).toLocaleString()}
            </p>
            <p>
              <b>Fecha de actualización:</b>{" "}
              {new Date(report.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ReportItem;
