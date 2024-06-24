import React, { useEffect, useRef } from "react";
import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Scroll to the top of the modal content when it opens
  useEffect(() => {
    if (isOpen && modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex justify-center items-center w-full h-full">
      <div className="modal-background" onClick={onClose}></div>
      <div
        className=" relative bg-white py-4 rounded shadow-lg z-50 overflow-auto lg:w-5/6 md:w-11/12 w-full max-h-full"
        ref={modalContentRef}
      >
        <h4 className="text-center lg:text-xl text-lg py-2 font-semibold">
          {title}
        </h4>
        <div className="flex justify-center items-center flex-col">
          {children}
        </div>
        <Button
          className="absolute top-0 right-0 px-4 py-2 bg-red-500 h-fit rounded focus:outline-none"
          onClick={onClose}
          label="X"
          variant="close"
        />
      </div>
      <style jsx>{`
        .modal-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  );
};

export default Modal;
