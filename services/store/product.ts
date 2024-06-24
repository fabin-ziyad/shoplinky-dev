import { handleApiResponse } from "@/utils/common";
import API from "../api";
import StoreAPI from "./storeApi";

// export const getAllStoreProducts = async () => {
//     try {
//         const getProducts = await API.get("/store/product");
//         return handleApiResponse(getProducts);
//     } catch (error) {
//         return handleApiResponse({ error });
//     }
// };

export const getAllStoreProducts = async (storeName: string) => {
  try {
    const getProducts = await StoreAPI.get(`/store/product/${storeName}`);
    return handleApiResponse(getProducts);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
