import {
  addProductToContent,
  getContentBySlug,
  removeProductFromContent,
} from "@/services/content";
import { getAllProducts } from "@/services/products";
import { useState, useEffect } from "react";
// import { getAllProducts, addProductToContent } from "your-api"; // Adjust the import paths accordingly
import { toast } from "react-toastify";

export const useContentProducts = (slug: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contentProducts, setContentProducts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [contentPrUpdated, setContentPrUpdated] = useState(0);
  const [contentData, setContentData] = useState<any>(null);
  const handleModal = () => {
    setSelectedProductIds([]);
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const fetchProductsNotInContent = async () => {
      try {
        const fetchAllProducts = await getAllProducts();
        if (fetchAllProducts.success) {
          const allProducts = fetchAllProducts.data;
          const fetchContent = await getContentBySlug(slug);
          if (fetchContent?.data?.data) {
            setContentData(fetchContent?.data?.data);
          }
          if (fetchContent?.data?.data?.products.length) {
            // Filter products that are not in the Content
            const productsNotInContent = allProducts.filter(
              (product: any) =>
                !fetchContent?.data?.data?.products.some(
                  (ContentProduct: any) => ContentProduct._id === product._id
                )
            );
            setContentProducts(productsNotInContent);
          } else {
            setContentProducts(allProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsNotInContent();
  }, [slug, contentPrUpdated]);

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
    setIsLoading(true);
    try {
      const response = await addProductToContent(slug, selectedProductIds);
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
  const removeContentProduct = async (slugId: string, prodId: string) => {
    try {
      const response = await removeProductFromContent(slugId, prodId);
      if (response.success) {
        setContentPrUpdated((prev) => prev + 1);
        setOpenModal(false);
        toast.success(response.message);
      } else {
        setOpenModal(false);
        toast.error(response.error);
      }
    } catch (error: any) {
      setOpenModal(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  return {
    contentProducts,
    handleModal,
    openModal,
    handleCheckboxChange,
    selectedProductIds,
    AddProductsToCollection,
    contentData,
    removeContentProduct,
    isLoading
  };
};
