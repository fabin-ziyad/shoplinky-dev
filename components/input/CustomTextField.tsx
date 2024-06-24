import { ErrorMessage, useField } from "formik";

interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  align?: "vertical" | "horizontal" | undefined;
  className?: string;
  [x: string]: any;
  disabled?: boolean;
}

const CustomTextInput = (props: Props) => {
  const [field, meta] = useField(props);
  const { name, type, label, placeholder, align, className, disabled, ...rest } = props;

  return (
    <div>
      <div
        className={align === "horizontal" ? "grid grid-cols-7 items-center justify-center" : ""}
      >
        <label
          className={`${align === "horizontal" ? "col-span-2" : ""} text-sm font-semibold`}
          htmlFor={name}
        >
          {label}
        </label>
        <input
          {...field}
          {...rest}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 mt-2 h-[44px] ${className ?? ""} ${align === "horizontal" ? "col-span-5" : ""}`}
        />
      </div>
      <ErrorMessage
        name={name}
        component="span"
        className="error text-red-400 text-sm italic"
      />
    </div>
  );
};

export default CustomTextInput;
