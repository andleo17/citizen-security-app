interface LabelProps {
  htmlFor: string;
  value?: string;
  inline?: boolean;
}

function Label({
  htmlFor,
  value,
  inline = false,
  children,
}: React.PropsWithChildren<LabelProps>) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-sm text-gray-900 dark:text-gray-300 whitespace-nowrap ${
        inline ? "" : "mb-2"
      }`}
    >
      {value ? value : children}
    </label>
  );
}

export default Label;
