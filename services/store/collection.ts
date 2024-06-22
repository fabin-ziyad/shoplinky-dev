import { handleApiResponse } from "@/utils/common";
import API from "../api";
import StoreAPI from "./storeApi";

export const getStoreCollections = async (storeName: string) => {
  try {
    const getAllCollections = await StoreAPI.get(
      `/store/collection/${storeName}`
    );
    return handleApiResponse(getAllCollections);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const getOneStoreCollection = async (storeName: string, id: string) => {
  try {
    const getOneCollection = await StoreAPI.get(
      `/store/collection/${id}/${storeName}`
    );
    return handleApiResponse(getOneCollection);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
