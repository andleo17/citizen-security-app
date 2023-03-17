import { PropsWithChildren } from "react";

const colors: Record<string, string> = {
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  orange:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

interface BadgeProps {
  color: string;
  label?: string;
}

function Badge({ color, label, children }: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${
        colors[color] || colors["gray"]
      }`}
    >
      {label || children}
    </span>
  );
}

export default Badge;
