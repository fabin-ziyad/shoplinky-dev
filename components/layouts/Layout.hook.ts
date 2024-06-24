"use client"
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Make sure to import the correct router
import { changeStore, initializeStore, useStore } from "@/store/storeFront";
import { getStoreData } from "@/services/store/main";
import { toast } from "react-toastify";

export const useStoreLayout = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [storeNotFound, setStoreNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleSideBar = () => setOpen((prev) => !prev);
  const path = usePathname();
  const storeName = path.split('/')[1];
  useEffect(() => {
    initializeStore();
  }, []);
  const [storeData, setStoreData] = useState<any>(null);
  useEffect(() => {
    const getMyStoreData = async () => {
      setIsLoading(true);
      try {
        const response = await getStoreData(storeName);
        if (response.success) {
          setStoreData(response?.data?.data);
          useStore.setState(response?.data?.data);
          changeStore(response?.data?.data);
          setIsLoading(false);
        } else {
          setStoreNotFound(true);
          setIsLoading(false);
          return toast.error(response.error);
        }
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
        return toast.error(error?.message || "Something went wrong");
      }
    };
    getMyStoreData();
  }, [path,storeName]);
  const findStoreName = (capital?: string) => {
    const parts = path.split("/");
    const storeName = parts[1];
    if (!storeName) return "";
    if (capital === "capital") {
      return storeName.charAt(0).toUpperCase() + storeName.slice(1);
    } else {
      return storeName;
    }
  };
  return {
    toggleSideBar,
    open,
    findStoreName,
    storeData,
    storeNotFound,
    storeName,
    isLoading
  };
};
