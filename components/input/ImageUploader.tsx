import React, { useState, useEffect } from "react";

interface UploadImagesProps {
  onChange: any;
  initialImage?: string;
  label?: string;
}

const UploadImages: React.FC<UploadImagesProps> = ({
  onChange,
  initialImage,
  label,
}) => {
  const [image, setImage] = useState<any>(initialImage);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
      const img = new Image();
      img.onload = () =>
        setImageDimensions({ width: img.width, height: img.height });
      img.src = initialImage;
    }
  }, [initialImage]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      alert("Please select an image");
      return;
    }

    const acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!acceptedFileTypes.includes(file.type)) {
      alert("Only PNG, JPG, and JPEG files are allowed.");
      return;
    }

    const maxFileSize = 2 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("The file size must be less than 2 MB.");
      return;
    }

    const img = new Image();
    img.onload = () =>
      setImageDimensions({ width: img.width, height: img.height });
    img.src = URL.createObjectURL(file);

    setImage(URL.createObjectURL(file));
    onChange(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    onChange(null);
    setImageDimensions({ width: 0, height: 0 });
  };

  return (
    <div className="relative mt-4">
      {image ? (
        <div className="flex items-center justify-center w-full h-full">
          <div
            className="relative"
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
            }}
          >
            <label>{label}</label>
            <img
              src={image}
              alt="Uploaded"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
              onClick={handleRemoveImage}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4>{label}</h4>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="mt-2 text-sm text-gray-400">
              Drop image here or click to upload
            </span>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={handleImageChange}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default UploadImages;
