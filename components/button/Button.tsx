import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "close" | "custom";
}

const Button = ({
  className,
  label,
  type = "button",
  disabled = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  // Function to get variant specific classes
  const variantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-black text-white hover:bg-white hover:text-black";
      case "close":
        return "bg-white text-black hover:bg-red-500 hover:text-white";
      case "custom":
        return className;
      default: // primary
        return "bg-white text-black hover:bg-black hover:text-white";
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      style={{zIndex:"0"}}
      className={`text-sm font-semibold shadow-md rounded h-[44px] px-4 py-2 transition duration-500 ease-in-out transform hover:translate-y-[-4px] hover:cursor-pointer ${variantClasses()} ${className} ${
        disabled
          ? "bg-gray-300 hover:bg-gray-300 hover:text-black cursor-not-allowed"
          : ""
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
