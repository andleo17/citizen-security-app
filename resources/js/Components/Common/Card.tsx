import { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
}

function Title({ children }: PropsWithChildren) {
  return (
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {children}
    </h5>
  );
}

function Body({ children }: PropsWithChildren) {
  return (
    <p className="font-normal text-gray-700 dark:text-gray-400">{children}</p>
  );
}

Card.Title = Title;
Card.Body = Body;

export default Card;
