import { InputHTMLAttributes, PropsWithChildren } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

function TextInput({
  labelText,
  inline = false,
  errors,
  type = "text",
  ...props
}: PropsWithChildren<FormFieldProps & InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      {labelText && <Label htmlFor={props.id} value={labelText} />}
      <input
        {...props}
        type={type}
        name={props.id}
        id={props.id}
        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
      />
      <ErrorMessage message={errors} />
    </div>
  );
}

export default TextInput;
