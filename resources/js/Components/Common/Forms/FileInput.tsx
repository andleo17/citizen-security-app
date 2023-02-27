import { InputHTMLAttributes, PropsWithChildren } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

function FileInput({
  labelText,
  inline = true,
  errors,
  ...props
}: PropsWithChildren<FormFieldProps & InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      {labelText && <Label htmlFor={props.id} value={labelText} />}
      <input
        {...props}
        type="file"
        name={props.id}
        id={props.id}
        className="rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 text-sm"
      />
      <ErrorMessage message={errors} />
    </div>
  );
}

export default FileInput;
