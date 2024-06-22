import { getStoreData } from "@/services/store/main";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useStore = (storeName: any) => {
  const [storeData, setStoreData] = useState<any>(null);
  useEffect(() => {
    const getMyStoreData = async () => {
      try {
        const response = await getStoreData(storeName);
        console.log(response)
          if (response.success) {
          setStoreData(response.data);
        } else {
          return toast.error(response.error);
        }
      } catch (error: any) {
        console.log(error)
        return toast.error(error?.message || "Something went wrong");
      }
    };
    getMyStoreData();
  }, [storeName]);
  return { storeData };
};
