import { useState, useEffect } from "react";
import axios from "axios";
import { getAllStoreProducts } from "@/services/store/product";
import { usePathname } from "next/navigation";
import { getStoreName } from "@/utils/common";
import { toast } from "react-toastify";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  user: string;
  category: string[];
  isActive: boolean;
  link: string;
  collections: string[];
  contents: string[];
  image: string;
  slug: string;
  creation: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const useStoreProducts = () => {
  const path = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const store = getStoreName(path);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllStoreProducts(store);

        if (response.success) {
          setProducts(response.data?.data);
        } else {
          toast.error(response.error);
        }
      } catch (error) {
        toast.error("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    if (products.length == 0) {
      fetchProducts();
    }
  }, [store]);

  return { products, productsLoading:loading, error };
};
