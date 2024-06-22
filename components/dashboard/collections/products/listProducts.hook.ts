import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getCollectionBySlug,
  toggleOneCollection,
  getCollections,
  removeProductFromCollection,
  addProductsToCollection,
  deleteCollection,
} from "@/services/collection";
import { getAllProducts } from "@/services/products";

export const useCollectionProducts = (id: string) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState<any>([]);
  const [collectionProductDeleted, setCollectionProductDeleted] =
    useState(false);
  const [collection, setCollection] = useState<any>(null);

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const findCollection = async () => {
      const getCollection = await getCollectionBySlug(id);
      if (getCollection.success) {
        setCollection(getCollection.data?.data);
      }
    };
    findCollection();
  }, [id, collections]);

  const viewContent = (id: string) => {
    router.push(`/dashboard/collections/${id}`);
  };

  const toggleStatus = async (id: string) => {
    try {
      const response = await toggleOneCollection(id);
      if (!response) {
        toast.error("Failed to fetch collections");
        return;
      }
      toast.success(response.message);
    } catch (error) {
      toast.error("Error toggling status");
    }
  };

  const updateCollections = async () => {
    try {
      const response = await getCollections();
      if (!response) {
        toast.error("Failed to fetch collections");
        return;
      }
      setCollections(response.data);
    } catch (error) {
      toast.error("Failed to fetch collections");
    }
  };

  const removeProduct = async (collectionSlug: string, productId: string) => {
    try {
      const response = await removeProductFromCollection(
        collectionSlug,
        productId
      );
      if (!response || !response.success) {
        toast.error("Failed to remove Product from this collection");
        return;
      }
      setCollection((prevCollection: any) => ({
        ...prevCollection,
        products: prevCollection.products.filter(
          (product: any) => product._id !== productId
        ),
      }));
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    updateCollections();
  }, []);

  useEffect(() => {
    if (collectionProductDeleted) {
      updateCollections();
      setCollectionProductDeleted(false);
    }
  }, [collectionProductDeleted]);

  const deleteOneCollection = async (id: string) => {
    setIsLoading(true);
    try {
      const removeCollection = await deleteCollection(id);
      if (removeCollection) {
        toast.success("Collection removed successfully");
        setCollectionProductDeleted(true); // Indicate that a collection was deleted
      } else {
        toast.error("Failed to remove collection");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to remove collection");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response?.success && response?.data) {
        setProducts(response?.data);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [products.length]);

  const handleModal = () => {
    setSelectedProductIds([]);
    setOpen(!isOpen);
  };

  const handleCheckboxChange = (productId: any) => {
    setSelectedProductIds((prevSelected: any) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id: any) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const AddProductsToCollection = async () => {
    try {
      const response = await addProductsToCollection(
        collection?._id,
        selectedProductIds
      );
      if (response.success) {
        setCollection((prevCollection: any) => ({
          ...prevCollection,
          products: [
            ...prevCollection.products,
            ...selectedProductIds.map((id: any) =>
              products.find((product: any) => product._id === id)
            ),
          ],
        }));
        setOpen(false);
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return {
    isOpen,
    isLoading,
    collection,
    selectedProductIds,
    products,
    handleModal,
    handleCheckboxChange,
    AddProductsToCollection,
    removeProduct,
    deleteOneCollection,
    viewContent,
    toggleStatus,
  };
};


