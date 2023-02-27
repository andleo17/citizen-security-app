interface LabelProps {
  htmlFor: string;
  value?: string;
}

function Label({
  htmlFor,
  value,
  children,
}: React.PropsWithChildren<LabelProps>) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block font-medium text-sm text-gray-900 dark:text-gray-300"
    >
      {value ? value : children}
    </label>
  );
}

export default Label;
