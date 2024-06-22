import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface CopyToClipboardComponentProps {
  value: string;
}

const CopyClipboard: React.FC<CopyToClipboardComponentProps> = ({ value }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 200);
  };

  useEffect(() => {
    if (copied) {
      toast.success("Link Copied");
    }
  }, [copied]);

  return (
    <div>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        <button>
          <IoCopyOutline size={24} className="flex justify-center" />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CopyClipboard;
