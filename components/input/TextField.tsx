import React from "react";
import { useField } from "formik";

const TextField = ({
  disabled=false,
  label,
  placeholder,
  prefix,
  type = "text",
  className,
  inputClass,
  ...props
}: any) => {
  const [field, meta, helpers] = useField(props);
  const { value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className={` ${className}`}>
      {label && (
        <label
          className="block text-gray-700 text-sm font-semibold mb-2"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <div className="flex items-center appearance-none w-full text-gray-700 leading-tight ">
        {prefix && (
          <span className="pl-4 py-2 bg-gray-50 text-gray-400 text-medium rounded-tl-lg rounded-bl-lg h-[40px]">
            {prefix}/
          </span>
        )}
        <input
          {...field}
          type={type}
          id={props.id || props.name}
          className={`flex-1 outline-none pr-3 bg-gray-50 pb-1 text-medium rounded-lg h-[40px] ${error && touched ? "border-red-500" : ""
            } ${inputClass}`}
          onChange={handleChange}
          placeholder={placeholder}
          style={{ color: 'black' }} // Ensure input text is black
          disabled={disabled}
        />
      </div>
      {error && touched && (
        <p className="text-red-500 text-xs italic">{error}</p>
      )}
      <style jsx>{`
        input::placeholder {
          color: black; // Change placeholder color here
        }
      `}</style>
    </div>
  );
};

export default TextField;
