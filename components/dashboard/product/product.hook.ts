import * as Yup from "yup";

import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useCollection } from "@/components/storeFront/collection/collection.hooks";
// import { useCollections } from "../collections/collection.hooks";
import {
  createProduct,
  deleteOneProduct,
  getAllProducts,
  getProductBySlug,
  toggleProductStatus,
  updateProductStatus,
} from "@/services/products";
import { toast } from "react-toastify";
import { uploadFile } from "@/services/common";
import { getCollections } from "@/services/collection";

export const addProductByLink = () => {
  const initialValues = {
    link: "",
  };
  const validationSchema = Yup.object().shape({
    link: Yup.string().required("link is required"),
  });
  const handleSubmit = (values: any) => {
    console.log(values, "--------------------------------");
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
  };
};

export const useProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contentPrUpdated, setContentPrUpdated] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      // setIsLoading(true);
      try {
        const response = await getAllProducts();
        if (response) {
          setProducts(response?.data);
          setIsLoading(false);
        } else {
          toast.error("Failed to fetch products");
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
      }
    };
    fetchProducts();
  }, [contentPrUpdated]);
  const deleteProduct = async (slugId: string) => {
    try {
      const response = await deleteOneProduct(slugId);
      if (response.success) {
        setContentPrUpdated((prev) => prev + 1);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const toggleThisProduct = async (slug: string) => {
    try {
      const response = await toggleProductStatus(slug);
      if (response.success) {
        setContentPrUpdated((prev) => prev + 1);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return { products, deleteProduct, isLoading, toggleThisProduct, router };
};

export const useAddProducts = () => {
  const router = useRouter();
  const [collections, setCollections] = useState<any>([]);
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  const initialValues = {
    name: "",
    description: "",
    image: "",
    price: "",
    discount: "",
    link: "",
    selectedCategories: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string()
      .required("description is required")
      .max(56, "description must be at most 56 characters long"),
    price: Yup.string().required("price is required"),
    discount: Yup.string().required("discount is required"),
    link: Yup.string().required("link is required"),
    // collection: Yup.string().required("collection is required"),
  });
  useEffect(() => {
    const findCollections = async () => {
      try {
        const response = await getCollections();
        if (response.success) {
          setCollections(response?.data?.data);
        } else {
          toast.error(response.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    findCollections();
  }, []);

  const addProduct = async (values: any) => {
    console.log(values, image);
    try {
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an image");
      }
      const form_data = new FormData();
      form_data.append("product", image);
      const uploadImage = await uploadFile(form_data, "product");
      if (!uploadImage?.data.success) {
        setIsLoading(false);
        return toast.error("Failed to upload Image");
      }
      values = { ...values, image: uploadImage.data.data };
      const response = await createProduct(values);
      if (response) {
        toast.success(response.data.message);
        router.push("/dashboard/products");
      } else {
        // @ts-ignore
        toast.error(response?.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return {
    collections,
    initialValues,
    validationSchema,
    addProduct,
    handleImageChange,
    isLoading,
  };
};

export const useUpdateProduct = (slug: string) => {
  const router = useRouter();
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  const cancelRouting = () => {
    router.push("/dashboard/products");
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductBySlug(slug);
        if (!product.success) {
          return toast.error("Unable to find the product");
        }
        setInitialValues({
          name: product?.data?.data.name,
          description: product?.data?.data.description,
          price: product?.data?.data.price,
          discount: product?.data?.data.discount,
          link: product?.data?.data.link,
          image: product?.data?.data.image,
          collections: product?.data?.data?.collections,
        });
        setImage(product?.data?.data.image);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [slug]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    description: Yup.string()
      .required("description is required")
      .max(36, "description must be at most 36 characters long"),
    price: Yup.string().required("price is required"),
    discount: Yup.string().required("discount is required"),
    link: Yup.string().required("link is required"),
    // collection: Yup.string().required("collection is required"),
  });

  const updateProduct = async (values: any) => {
    setIsLoading(true);
    try {
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an image");
      }
      if (image !== initialValues?.image) {
        const form_data = new FormData();
        form_data.append("product", image);

        const uploadImage = await uploadFile(form_data, "product");
        if (!uploadImage?.data?.success) {
          setIsLoading(false);
          return toast.error("Failed to upload Image");
        }
        values = { ...values, image: uploadImage?.data?.data };
      }

      const response = await updateProductStatus(slug, values);
      if (response.success) {
        toast.success(response.message);
        setIsLoading(false);
        router.push("/dashboard/products");
      } else {
        toast.error(response.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    cancelRouting,
    initialValues,
    validationSchema,
    updateProduct,
    handleImageChange,
  };
};
