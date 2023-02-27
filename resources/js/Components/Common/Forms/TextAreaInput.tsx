import { PropsWithChildren, TextareaHTMLAttributes } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

function TextAreaInput({
  labelText,
  inline = false,
  errors,
  ...props
}: PropsWithChildren<
  FormFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      {labelText && <Label htmlFor={props.id} value={labelText} />}
      <textarea
        {...props}
        name={props.id}
        id={props.id}
        className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
      />
      <ErrorMessage message={errors} />
    </div>
  );
}

export default TextAreaInput;
