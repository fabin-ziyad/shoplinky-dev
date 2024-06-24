import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getLastParams, getStoreName } from "@/utils/common";
import {
  getOneStoreCollection,
  getStoreCollections,
} from "@/services/store/collection";
import { toast } from "react-toastify";

export const useCollection = () => {
  const path = usePathname();

  const findStoreName = () => {
    return path.split("/")[1];
  };
  return { findStoreName };
};

export interface Collection {
  name: string;
  description: string;
  slug: string;
  image: string;
  products: any[]; // Replace with the appropriate type for products
}

export const useCollectionsData = () => {
  const path = usePathname();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const store = getStoreName(path);

  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await getStoreCollections(store);
        if (response.success) {
          setCollections(response.data?.data);
        } else {
          toast.error(response.error);
        }
      } catch (error) {
        toast.error("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (collections.length == 0) {
      getCollections();
    }
  }, [path]);

  return { collections, loading, error, store };
};

export const useFetchCollectionData = () => {
  const path = usePathname();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [getUserName, setUserName] = useState<any>(null);
  const store = getStoreName(path);
  const collectionId = getLastParams(path);
  useEffect(() => {
    const getCollections = async () => {
      try {
        const response = await getOneStoreCollection(store, collectionId);
        if (response.success) {
          setCollections(response.data?.data);
          setUserName(response?.data?.data?.user);
        } else {
          toast.error(response.error);
        }
      } catch (error) {
        toast.error("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    getCollections();
  }, [path]);

  return { collections, loading, store, getUserName };
};
