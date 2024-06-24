import React from "react";
import { toast } from "react-toastify";
interface CopyButtonProps {
  textToCopy: string;
  children?: any;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  children,
  textToCopy,
}: any) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
       toast.success("Copied successfully")
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  return (
    <button onClick={() => copyToClipboard(textToCopy)}>{children}</button>
  );
};

export default CopyButton;
