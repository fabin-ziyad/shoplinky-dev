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
  const [field] = useField(props);

  return (
    <div>
      <div
        className={
          props.align === "horizontal"
            ? `grid grid-cols-7 items-center justify-center`
            : ""
        }
      >
        <label
          className={`${props.align === "horizontal" ? `col-span-2` : ""} text-sm font-semibold`}
          htmlFor={props.name || props.id}
        >
          {props.label}
        </label>
        <input
          {...field}
          {...props}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2.5 mt-2 h-[44px] ${
            props.className ?? ""
          } ${props.align === "horizontal" ? "col-span-5" : ""}`}
        />
      </div>
      <ErrorMessage
        name={props.name}
        component="span"
        className="error text-red-400 text-sm italic"
      />
    </div>
  );
};

export default CustomTextInput;
