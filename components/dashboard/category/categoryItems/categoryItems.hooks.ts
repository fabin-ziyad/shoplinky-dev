import { addCategoryItems, getCategoryDetails, removeCategoryItem } from "@/services/category";
import { getContents } from "@/services/content";
import { getAllProducts } from "@/services/products";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useCategoryItems = (slug: string) => {
  const [categoryData, setCategoryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [contentItems, setContentItems] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItemIDs, setSelectedItemsIDs] = useState([]);
  const [contentPrUpdated, setContentPrUpdated] = useState(0);
  const [contentData, setContentData] = useState<any>(null);

  const handleModal = () => {
    setSelectedItemsIDs([]);
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const getCategoryWithContents = async () => {
      setIsInitialLoading(true);
      try {
        const response = await getCategoryDetails(slug);
        if (response.success) {
          const category = response.data?.data;
          setCategoryData(category);

          let allItems;
          if (category.type === "Product") {
            const fetchAllProducts = await getAllProducts();
            if (fetchAllProducts.success) {
              allItems = fetchAllProducts.data;
            } else {
              return toast.error(fetchAllProducts.error);
            }
          } else {
            const getAllContents = await getContents();
            if (getAllContents.success) {
              allItems = getAllContents.data?.data;
            } else {
              return toast.error(getAllContents.error);
            }
          }
          const filteredItems = allItems.filter(
            (item: any) =>
              !category?.items.some(
                (categoryItem: any) => categoryItem._id === item._id
              )
          );
          setContentItems(filteredItems);
          setIsInitialLoading(false);
        } else {
          return toast.error(response.error);
        }
      } catch (error: any) {
        return toast.error(error.message);
      } finally {
        setIsInitialLoading(false);
      }
    };

    getCategoryWithContents();
  }, [slug, contentPrUpdated,categoryData]);
  const handleCheckboxChange = (ItemID: any) => {
    setSelectedItemsIDs((prevSelected: any) => {
      if (prevSelected.includes(ItemID)) {
        return prevSelected.filter((id: any) => id !== ItemID);
      } else {
        return [...prevSelected, ItemID];
      }
    });
  };
  const addItemsToCategory = async () => {
    setIsLoading(true);
    try {
      const response = await addCategoryItems(slug, selectedItemIDs);
      if (response.success) {
        setContentPrUpdated((prev) => prev + 1);
        setIsLoading(false);
        setOpenModal(false);
        toast.success(response.message);
      } else {
        setOpenModal(false);
        setIsLoading(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setOpenModal(false);
      toast.error(error.message || "Something went wrong");
    }
  };
  const removeItemsFromCategory = async (slugId: string, itemID: string) => {
    setIsLoading(true);
    try {
      const response = await removeCategoryItem(slugId, itemID);
      if (response.success) {
        setContentPrUpdated((prev) => prev + 1);
        setIsLoading(false);
        setOpenModal(false);
        toast.success(response.message);
      } else {
        setOpenModal(false);
        setIsLoading(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setOpenModal(false);
      toast.error(error.message || "Something went wrong");
    }
  };
  return {
    categoryData,
    handleModal,
    openModal,
    isLoading,
    contentItems,
    handleCheckboxChange,
    selectedItemIDs,
    addItemsToCategory,
    removeItemsFromCategory,
    isInitialLoading
  };
};
