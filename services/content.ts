import { handleApiResponse } from "@/utils/common";
import API from "./api";

export const createContent = async (data: any) => {
  try {
    const createContent = await API.post("/content/create", {
      data: data,
    });
    if (!createContent || createContent.error) {
      return null;
    }
    return createContent;
  } catch (error) {
    return null;
  }
};

export const getContents = async () => {
  try {
    const getAllContents = await API.get("/content");
    return handleApiResponse(getAllContents);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const updateOneContent = async (id: string, values: any) => {
  try {
    const updatedContent = await API.post(`/content/update/${id}`, {
      data: values,
    });
    return updatedContent.data;
  } catch (error) {
    return error;
  }
};
export const addProductsToContent = async (id: string, productIds: any) => {
  try {
    const response = await API.post(`/content/addProducts/${id}`, {
      data: productIds,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const toggleOneContent = async (id: string) => {
  try {
    const toggle = await API.post(`/content/toggle/${id}`);
    return handleApiResponse(toggle);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const removeProductFromContent = async (id: string, prodId: string) => {
  try {
    const response = await API.post(`/content/removeProduct/${id}`, {
      productId: prodId,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
export const addProductToContent = async (id: string, productIds: any) => {
  try {
    const addedProduct = await API.post(`/content/addProduct/${id}`, {
      data: productIds,
    });
    return handleApiResponse(addedProduct);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const deleteContent = async (id: string) => {
  try {
    const removedContent = await API.remove(`/content/delete/${id}`);
    return handleApiResponse(removedContent);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const getContentBySlug = async (slug: string) => {
  try {
    const getOneContent = await API.get(`/content/${slug}`);
    return handleApiResponse(getOneContent);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
