export const hasErrors = (errorObj: any) => {
  return Object?.keys(errorObj).length > 0;
};
export const truncateText = (text: string, maxLength: number) => {
  return text?.length > maxLength
    ? text?.substring(0, maxLength) + "..."
    : text;
};

export const sliceUserData = (data: any) => {
  if (data) {
    const obj = {
      token: data.accessToken,
      uid: data.uid,
      email: data.email,
      name: data.displayName,
    };
    return obj;
  } else {
    return null;
  }
};

export const ImageUploader = async (Image: any, type: string) => {
  try {
    if (
      !Image &&
      Image === undefined &&
      Image === null &&
      Image === "undefined"
    ) {
      return {
        success: false,
        message: "Please select an image",
      };
    }

    // Check file type
    const acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!acceptedFileTypes.includes(Image.type)) {
      //   alert("Only PNG, JPG, and JPEG files are allowed.");
      return {
        success: false,
        message: "Only PNG, JPG, and JPEG files are allowed.",
      };
    }

    // Check file size
    const maxFileSize = 2 * 1024 * 1024; // 5 MB in bytes
    if (Image.size > maxFileSize) {
      alert("The file size must be less than 2 MB.");
      return {
        success: false,
        message: "The file size must be less than 2 MB.",
      };
    }

    // Upload the selected image to your server
    const formData = new FormData();
    formData.append(type, Image);

    // formData.append("id", user._id);
    // const response = await UserControll.UploadImage(formData);
    // if (response.success) {
    //   return {
    //     success: true,
    //     data: response.data,
    //     message: "Image uploaded successfully",
    //   };
    // }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      message: "Error uploading image",
    };
  }
};
export const convertFileToBlob = async (name: string, file: any) => {
  const formData = new FormData();
  formData.append(name, file);
  return formData;
};

// utils/apiResponseHandler.js
export const handleApiResponse = (response: any) => {
  if (response && response.data && !response.error) {
    return {
      success: true,
      data: response.data,
      message: response?.data?.message,
    };
  } else {
    const error =
      response.error.response.data || new Error("Unknown error occurred");
    return { success: false, error: error.message || error.toString() };
  }
};
export const convertToFirstLetterUppercase = (str: any) => {
  const words = str?.split(" ");
  const capitalizedWords = words?.map((word: any) => {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  });
  return capitalizedWords?.join(" ");
};
export const toCamelCase = (str: any) => {
  return str
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (match: any, char: any) =>
      char ? char.toUpperCase() : ""
    )
    .replace(/^[A-Z]/, (match: any) => match.toLowerCase());
};

export const getStoreName = (path: any) => {
  const storeName = path?.split("/")[1];
  return storeName;
};
export const getLastParams = (path: any) => {
  const urlLastSegment = path?.split("/");
  const result = urlLastSegment.length - 1;
  return urlLastSegment[result];
};
export const goBack = () => {
  window.history.back()
};