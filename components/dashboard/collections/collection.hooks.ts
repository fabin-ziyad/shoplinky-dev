import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCollections,
  toggleOneCollection,
  deleteCollection,
  getCollectionBySlug,
} from "@/services/collection";
import { useRouter } from "next-nprogress-bar";

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
  const [collectionData, setCollectionData] = useState<any>(null);
  useEffect(() => {
    const getCollectionData = async () => {
      try {
        const response = await getCollectionBySlug(slug);
        console.log(response)
        if (response?.success) {
          setCollectionData(response?.data?.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {}
    };
    getCollectionData();
  }, [slug]);
  return {collectionData};
};
