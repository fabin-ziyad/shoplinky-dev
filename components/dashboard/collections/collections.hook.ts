import * as Yup from "yup";
import {
  createCollection,
  deleteCollection,
  getCollections,
  removeProductFromCollection,
  toggleOneCollection,
  updateOneCollection,
} from "@/services/collection";
import { uploadFile } from "@/services/common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next-nprogress-bar";

export const useAddCollection = () => {
  const router = useRouter();
  const { setContentPrUpdated } = useCollections();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);

  const defaultInitialValues = {
    name: "",
    description: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Collection Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an image");
      }
      const form_data = new FormData();
      form_data.append("collection", image);
      const uploadImage = await uploadFile(form_data, "collection");
      if (!uploadImage?.data.success) {
        setIsLoading(false);
        return toast.error("Failed to upload Image");
      }
      values = { ...values, image: uploadImage.data.data };
      const response = await createCollection(values);
      if (!response) {
        toast.error("Failed to create collection");
        setIsLoading(false);
        return;
      } else {
        toast.success("Collection created successfully");
        setIsLoading(false);
        router.push("/dashboard/collections");
        setContentPrUpdated((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  return {
    defaultInitialValues,
    validationSchema,
    handleSubmit,
    handleImageChange,
    image,
    isLoading,
  };
};

export const useUpdateCollection = ( data: any) => {
  const { setContentPrUpdated } = useCollections();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(data?.image || "");

  const defaultInitialValues = { ...data };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Collection Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      if (image !== data.image) {
        const formData = new FormData();
        formData.append("collection", image);

        const uploadImage = await uploadFile(formData, "collection");

        if (!uploadImage?.data.success) {
          setIsLoading(false);
          return toast.error("Failed to upload Image");
        }

        values.image = uploadImage.data.data;
      }

      const updated = await updateOneCollection(values._id, values);

      if (updated && updated.success) {
        toast.success(updated.message);
        // await refetchCollections();
        setContentPrUpdated((prev) => prev + 1);
        setIsLoading(false);
      } else {
        throw new Error(updated?.message || "Failed to update collection");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update collection");
      setIsLoading(false);
    }
  };

  return {
    defaultInitialValues,
    validationSchema,
    handleSubmit,
    handleImageChange,
    image,
    isLoading,
  };
};
export const useCollections = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [filtered, setIsFiltered] = useState(false);
  const [collections, setCollections] = useState<any>([]);
  const [updated, setupdated] = useState<any>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [collectionProduct, setCollectionProducts] = useState([]);
  const [reRenderCollections, setReRenderCollections] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [contentPrUpdated, setContentPrUpdated] = useState(0);

  const viewContent = (id: string) => {
    router.push(`/dashboard/collections/${id}`);
  };
  const addCollection = () => {
    router.push('/dashboard/collections/add')
  }
  const toggleStatus = async (id: string) => {
    try {
      const response = await toggleOneCollection(id);
      if (!response) {
        toast.error("Failed to fetch collections");
        return;
      }
      setContentPrUpdated((prev) => prev + 1);
      return toast.success(response.message);
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    const refetchCollections = async () => {
      try {
        const response = await getCollections();
        if (!response) {
          toast.error("Failed to fetch collections");
          return;
        }
        setCollections([]);
        setCollections(response.data);
        setupdated(response.data);
      } catch (error) {
        toast.error("Failed to fetch collections");
      }
    };
    refetchCollections();
  }, [contentPrUpdated]);
  // const refetchCollections = async () => {
  //   try {
  //     const response = await getCollections();
  //     if (!response) {
  //       toast.error("Failed to fetch collections");
  //       return;
  //     }
  //     setCollections([]);
  //     console.log(response);
  //     setCollections(response.data);
  //     console.log("collections", collections);
  //     setupdated(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch collections");
  //   }
  // };

  // useEffect(() => {
  //   refetchCollections();
  // }, []);

  // useEffect(() => {
  //   if (reRenderCollections) {
  //     refetchCollections();
  //     setReRenderCollections(false);
  //   }
  // }, [reRenderCollections]);

  const deleteOneCollection = async (id: string) => {
    setIsLoading(true);
    try {
      const removeCollection = await deleteCollection(id);
      if (removeCollection) {
        setContentPrUpdated((prev) => prev + 1);
        toast.success("Collection removed successfully");
      } else {
        toast.error("Failed to remove collection");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to remove collection");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    collections,
    setCollections,
    // getCollectionProducts,
    collectionProduct,
    isLoading,
    setIsFiltered,
    filtered,
    // refetchCollections,
    setDeleteModal,
    deleteModal,
    deleteOneCollection,
    setIsPublished,
    isPublished,
    showActions,
    updated,
    setShowActions,
    viewContent,
    toggleStatus,
    setContentPrUpdated,
    addCollection
  };
};
