import { handleApiResponse } from "@/utils/common";
import API from "../api";
import StoreAPI from "./storeApi";

// export const getStoreContents = async () => {
//     try {
//         const getAllContents = await API.get("/store/content");
//         return handleApiResponse(getAllContents);
//     } catch (error) {
//         return handleApiResponse({ error });
//     }
// };

export const getStoreContents = async (storeName: string) => {
  try {
    const getAllContents = await StoreAPI.get(`/store/content/${storeName}`);
    return handleApiResponse(getAllContents);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const getOneStoreContent = async (storeName: string, id: string) => {
  try {
    const getOneContent = await StoreAPI.get(
      `/store/content/${id}/${storeName}`
    );
    return handleApiResponse(getOneContent);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
