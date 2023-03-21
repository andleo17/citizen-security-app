import { PropsWithChildren } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

function Item(
  props: PropsWithChildren<React.OptionHTMLAttributes<HTMLOptionElement>>
) {
  return <option value={props.value}>{props.children}</option>;
}

function SelectInput({
  labelText,
  inline = false,
  errors,
  placeholder,
  ...props
}: PropsWithChildren<
  FormFieldProps & React.SelectHTMLAttributes<HTMLSelectElement>
>) {
  return (
    <div className={inline ? "flex items-center gap-2" : undefined}>
      {labelText && (
        <Label htmlFor={props.id} value={labelText} inline={inline} />
      )}
      <select
        {...props}
        name={props.id}
        id={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {placeholder && <option value="-1">{placeholder}</option>}
        {props.children}
      </select>
      <ErrorMessage message={errors} />
    </div>
  );
}

SelectInput.Item = Item;

export default SelectInput;

