import { handleApiResponse } from "@/utils/common";
import API from "./api";

export const createProduct = async (data: any) => {
  try {
    const createProduct = await API.post("/products/create", {
      data: data,
    });
    if (!createProduct || createProduct.error) {
      return null;
    }
    return createProduct;
  } catch (error) {
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const getProducts = await API.get("/products");
    return handleApiResponse(getProducts);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const ProductsByType = async (data: any) => {
  const obj = { type: data.type, typeId: data.typeId };
  try {
    const getProductType = await API.post("/products/get-by-type", {
      data: obj,
    });
    if (!getProductType.error && getProductType.data) {
      return getProductType.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const getProductBySlug = async (slugId: string) => {
  try {
    const getProductData = await API.get(`/products/${slugId}`);
    return handleApiResponse(getProductData);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
export const deleteOneProduct = async (slug: string) => {
  try {
    const deletedProduct = await API.post(`/products/delete/${slug}`);
    return handleApiResponse(deletedProduct);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const toggleProductStatus = async (slug: string) => {
  try {
    const toggleProduct = await API.post(`/products/toggle/${slug}`);
    return handleApiResponse(toggleProduct);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const updateProductStatus = async (slug: string, values: any) => {
  try {
    const updatedProduct = await API.post(`/products/update/${slug}`,values);
    return handleApiResponse(updatedProduct);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
