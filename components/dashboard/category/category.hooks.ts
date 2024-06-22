import { createCategory, deleteOneCategory, getAllCategories, toggleCategoryStatus } from "@/services/category";
import { ProductsByType } from "@/services/products";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
export const useAddCategory = (onclose: any) => {
  const [isLoading, setIsLoading] = useState(false);
  // const { setCategories } = useCategories();

  const deafultInitialValues = {
    name: "",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    type: Yup.string().required("type is required"),
  });
  const handleSubmit = async (values: any) => {
    console.log("enetred function");
    setIsLoading(true);
    try {
      const response = await createCategory(values);
      if (!response) {
        toast.error("Failed to create category");
        onclose();
      } else {
        toast.success("Category created successfully");
        const response = await getAllCategories();
        if (!response) {
          toast.error("failed to fetch all categories");
          return;
        }
        // setCategories(response.data.data);
        onclose();
      }
    } catch (error) {
      toast.error("Failed to create category");
      onclose();
    }
  };
  return { deafultInitialValues, validationSchema, handleSubmit };
};

export const useUpdateCategory = (onclose: any) => {
  const [categories, setCategories] = useState<any>([]);

  const deafultInitialValues = {
    name: "",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    type: Yup.string().required("type is required"),
  });
  const handleSubmit = (values: any) => {
    console.log(values, "--------------------------------");
  };
  return { deafultInitialValues, validationSchema, handleSubmit, categories };
};

export const useCategories = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const [ctUpdated, setCtUpdated] = useState(0);
  const [addCat, setAddCat] = useState(false);
  const handleAddCatModal = () => {
    setAddCat(!addCat);
  };
  const viewCategory = (slug:string) => {
    router.push(`/dashboard/categories/${slug}`)
  }
  const deafultInitialValues = {
    name: "",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
    type: Yup.string().required("type is required"),
  });
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success) {
          setCategories(response?.data?.data);
        } else {
          return toast.error(response?.error);
        }
      } catch (error: any) {
        toast.error(error?.message);
      }
    };
    fetchCategories();
  }, [ctUpdated]);
  const createNewCategory = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await createCategory(data);
      if (response.success) {
        setCtUpdated((prev) => prev + 1);
        setIsLoading(false);
        toast.success(response.message);
        setAddCat(false)
      } else {
        toast.error(response.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
  const deleteCategory = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await deleteOneCategory(slug);
      if (response.success) {
        setCtUpdated((prev) => prev + 1);
        setIsLoading(false);
        toast.success(response.message);
        setAddCat(false)
      } else {
        toast.error(response.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
  const toggleCategory = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await toggleCategoryStatus(slug);
      if (response.success) {
        setCtUpdated((prev) => prev + 1);
        setIsLoading(false);
        toast.success(response.message);
        setAddCat(false)
      } else {
        toast.error(response.error);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };
  return {
    categories,
    isLoading,
    createNewCategory,
    handleAddCatModal,
    addCat,
    deafultInitialValues,
    validationSchema,
    deleteCategory,
    toggleCategory,
    viewCategory
  };
};
