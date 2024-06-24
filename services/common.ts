import API from "./api";

export const uploadFile = async (formData: any, Type: string) => {
  try {
    const uploadDoc = await API.post(
      "/upload",
       formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!uploadDoc || uploadDoc.error) {
      return null;
    }
    return uploadDoc;
  } catch (error) {
    return null;
  }
};
