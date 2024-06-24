import React from "react";

interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
  onClick?: () => void; // Event handler for click events
  className?: string;
  icon: React.ElementType; // Proper type for using JSX elements
}

const ButtonWithIcon: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  className,
  icon: Icon, // Correct usage as a React component
  label,
  onClick, // Capture the onClick prop explicitly
  ...props
}) => {
  const sizeClass = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-lg",
  }[size];
  const primaryClass = primary ? "bg-blue-500 text-white" : "bg-transparent";

  const buttonClasses = `px-4 py-2 border rounded hover:cursor-pointer ${sizeClass} ${primaryClass} ${className || ""}`;

  return (
    <button 
      className={`${buttonClasses} w-full my-2 flex justify-center items-center gap-x-2`}
      onClick={onClick} // Apply the onClick handler
      style={{ backgroundColor }} // Apply custom background color if provided
      {...props} // Spread any other passed props
    >
      {Icon && <Icon size={25} />}
      {label}
    </button>
  );
};

export default ButtonWithIcon;
