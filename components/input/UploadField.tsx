import React from "react";
import { useFormikContext } from "formik";
import Button from "../button/Button";

interface FileComponentProps {
  name: string;
  label?: string;
  footerLabel?: string;
  className?: string;
}

const FileComponent: React.FC<FileComponentProps> = ({
  name,
  label,
  footerLabel,
  className,
}) => {
  const { setFieldValue, errors, touched, values } = useFormikContext<any>();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFieldValue(fieldName, file);
      setFieldValue(`previews.${name}`, { file, previewUrl });
    }
  };

  const removePreview = (fieldName: string) => {
    setFieldValue(fieldName, null);
    setFieldValue(`previews.${name}`, null);
  };
  // console.log(values);
  const initialImageUrl = values.img;
  const preview = values.previews?.[name];
  const previewUrl = preview?.previewUrl || initialImageUrl;

  return (
    <div>
      {label && <p className="py-2">{label}</p>}
      <div className="flex justify-center items-center">
        <div
          className={`bg-gray-100 p-2 border border-gray-400 rounded-lg relative ${className} ${
            !previewUrl ? "w-full" : ""
          } ${errors[name] && touched[name] ? " border-red-500" : ""}`}
          style={{
            minHeight: "100px",
            minWidth: previewUrl ? "100px" : "none",
          }}
        >
          {!previewUrl ? (
            <div className="mt-3">
              <input
                type="file"
                name={name}
                onChange={(e) => handleImageChange(e, name)}
                onBlur={() => setFieldValue(`${name}Touched`, true, false)}
                accept="image/png, image/jpeg"
                className="opacity-0 absolute inset-0 h-full w-full cursor-pointer"
              />
              <div className="flex justify-center items-center h-full w-full">
                <p className="text-center">
                  <span className="text-primary mb-1">
                    <i className="fas fa-cloud-upload-alt mr-1.5" />
                    Upload
                  </span>
                  <br />
                  <span className="mb-0 text-gray-600 text-sm">
                    (accepts only png and jpeg)
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxHeight: "400px", maxWidth: "100%" }} // Adjust max dimensions as needed
                className="object-contain"
              />
              <Button
                onClick={() => removePreview(name)}
                className="absolute top-0 right-0 px-2 py-1 h-fit rounded-none"
                label="X"
              />
            </div>
          )}
        </div>
      </div>
      {errors[name] && touched[name] && (
        //@ts-ignore
        <p className="text-red-500 mt-2 italic">{errors[name]}</p>
      )}
      {footerLabel && <p className="text-gray-600 mt-2">{footerLabel}</p>}
    </div>
  );
};

export default FileComponent;
