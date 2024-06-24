import { handleApiResponse } from "@/utils/common";
import StoreAPI from "./storeApi";

export const getStoreData = async (storeName:string) => {
  try {
    const getStoreDetails = await StoreAPI.get(`/store/${storeName}`);
    return handleApiResponse(getStoreDetails);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
