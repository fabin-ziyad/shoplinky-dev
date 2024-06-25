import { useState, useEffect } from "react";
import axios from "axios";
import { getAllStoreCategories } from "@/services/store/category";
import { usePathname } from "next/navigation";
import { getStoreName } from "@/utils/common";
import { toast } from "react-toastify";

export type Category = {
    _id: string;
    name: string;
    type: string;
    items: string;
    user: string;
    isActive: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export const useStoreCategories = () => {
    const path = usePathname();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const store = getStoreName(path);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await getAllStoreCategories(store);

                if (response.success) {
                    setCategories(response.data?.data);
                } else {
                    toast.error(response.error);
                }
            } catch (error) {
                toast.error("An unknown error occurred.");
            } finally {
                setLoading(false);
            }
        };
        if (categories.length == 0) {
            fetchCategories();
        }
    }, [store]);

    return { categories, categoriesLoading: loading, error };
};
