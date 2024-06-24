import { handleApiResponse } from "@/utils/common";
import API from "./api";

export const createCollection = async (data: any) => {
  try {
    const createCollection = await API.post("/collection/create", {
      data: data,
    });
    if (!createCollection || createCollection.error) {
      return null;
    }
    return createCollection;
  } catch (error) {
    return null;
  }
};

export const getCollections = async () => {
  try {
    const getAllCollections = await API.get("/collection");
    return handleApiResponse(getAllCollections);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const updateOneCollection = async (slug: string, values: any) => {
  try {
    const updatedCollection = await API.update(`/collection/update/${slug}`, {
      data: values,
    });
    return handleApiResponse(updatedCollection);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const addProductsToCollection = async (id: string, productIds: any) => {
  try {
    const response = await API.post(`/collection/addProducts/${id}`, {
      data: productIds,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const toggleOneCollection = async (id: string) => {
  try {
    const toggle = await API.post(`/collection/toggle/${id}`);
    return toggle.data;
  } catch (error) {
    return error;
  }
};
export const removeProductFromCollection = async (
  id: string,
  prodId: string
) => {
  try {
    const response = await API.post(`/collection/removeProduct/${id}`, {
      productId: prodId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deleteCollection = async (id: string) => {
  try {
    const removedCollection = await API.remove(`/collection/delete/${id}`);
    if (!removedCollection || removedCollection.error) {
      return null;
    }
    return removedCollection.data;
  } catch (error) {
    return null;
  }
};

export const getCollectionBySlug = async (id: string) => {
  try {
    const getOneCollection = await API.get(`/collection/${id}`);
    return handleApiResponse(getOneCollection);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
