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

export const getAllStoreCategories = async (storeName: string) => {
    try {
        const getCategories = await StoreAPI.get(`/store/category/${storeName}`);
        return handleApiResponse(getCategories);
    } catch (error) {
        return handleApiResponse({ error });
    }
};
