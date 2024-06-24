import React from "react";
import { useField } from "formik";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  [x: string]: any; // To accept any other props
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-700 text-sm font-semibold mb-2"
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectField;
