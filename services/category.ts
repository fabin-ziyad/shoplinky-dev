import { handleApiResponse } from "@/utils/common";
import API from "./api";

export const createCategory = async (data: any) => {
  try {
    const createdCategory = await API.post("/category/create", {
      data: data,
    });
    return handleApiResponse(createdCategory);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const getAllCategories = async () => {
  try {
    const getCategories = await API.get("/category");
    return handleApiResponse(getCategories);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const getCategoryDetails = async (slug: string) => {
  try {
    const getCategory = await API.get(`/category/${slug}`);
    return handleApiResponse(getCategory);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const addCategoryItems = async (slug: string, values: any) => {
  try {
    const itemsAdded = await API.post(`/category/addItems/${slug}`, {
      data: values,
    });
    return handleApiResponse(itemsAdded);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const removeCategoryItem = async (slug: string, itemID: string) => {
  try {
    const itemsAdded = await API.post(`/category/removeItems/${slug}`, {
      itemId: itemID,
    });
    return handleApiResponse(itemsAdded);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const deleteOneCategory = async (slug: string) => {
  try {
    const deletedCategory = await API.post(`/category/delete/${slug}`);
    return handleApiResponse(deletedCategory);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const toggleCategoryStatus = async (slug: string) => {
  try {
    const toggledCategory = await API.post(`/category/toggle/${slug}`);
    return handleApiResponse(toggledCategory);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const CategoriesByType = async (data: any) => {
  const obj = { type: data.type, typeId: data.typeId };
  console.log(obj);
  try {
    const getCategoryType = await API.post("/categories/get-by-type", {
      data: obj,
    });
    if (!getCategoryType.error && getCategoryType.data) {
      return getCategoryType.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
