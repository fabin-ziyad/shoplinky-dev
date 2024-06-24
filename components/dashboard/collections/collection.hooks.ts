import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCollections,
  toggleOneCollection,
  deleteCollection,
  getCollectionBySlug,
  updateOneCollection,
} from "@/services/collection";
import { useRouter } from "next-nprogress-bar";
import { uploadFile } from "@/services/common";

export const useCollection = () => {
  const router = useRouter();
  const [allCollections, setAllCollections] = useState<any>([]);
  const [contentPrUpdated, setContentPrUpdated] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const fetchAllCollection = async () => {
      try {
        const response = await getCollections();
        console.log("$$", response);
        if (response.success) {
          setAllCollections(response?.data?.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {}
    };
    fetchAllCollection();
  }, [contentPrUpdated]);
  const viewContent = (id: string) => {
    router.push(`/dashboard/collections/${id}`);
  };
  const addCollectionPage = () => {
    router.push("/dashboard/collections/add");
  };
  const editCollectionPage = (id: string) => {
    router.push(`/dashboard/collections/edit/${id}`);
  };
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
    viewContent,
    addCollectionPage,
    toggleStatus,
    deleteOneCollection,
    isLoading,
    allCollections,
    setDeleteModal,
    deleteModal,
    setShowActions,
    showActions,
    editCollectionPage,
  };
};

export const useUpdateCollection = (slug: string) => {
  const router = useRouter();  
  const [collectionData, setCollectionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [slugId,setSlugId]=useState(slug)
  useEffect(() => {
    setSlugId(slug)
    const getCollectionData = async () => {
      try {
        const response = await getCollectionBySlug(slugId);
        if (response?.success) {
          setCollectionData(response?.data?.data);
          setImage(response?.data?.data?.image);
        } else {
          toast.error(response.message);
        }
      } catch (error) {}
    };
    getCollectionData();
  }, [slugId]);

  const initialValues = {
    name: collectionData?.name,
    description: collectionData?.description,
    image:image
  };
  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Collection Name is required"),
  //   description: Yup.string().required("Description is required"),
  // });

  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      if (image !== collectionData.image) {
        const formData = new FormData();
        formData.append("collection", image);

        const uploadImage = await uploadFile(formData, "collection");

        if (!uploadImage?.data.success) {
          setIsLoading(false);
          return toast.error("Failed to upload Image");
        }

        values.image = uploadImage.data.data;
      }

      const updated = await updateOneCollection(slug, values);

      if (updated.success) {
        toast.success(updated.message);
        // await refetchCollections();
        setIsLoading(false);
        router.push('/dashboard/collections')
      } else {
        throw new Error(updated?.message || "Failed to update collection");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update collection");
      setIsLoading(false);
    }
  };
  return {
    collectionData,
    handleSubmit,
    handleImageChange,
    // validationSchema,
    initialValues,
    image,
    isLoading
  };
};
