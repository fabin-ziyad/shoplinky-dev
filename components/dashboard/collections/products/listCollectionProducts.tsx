import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import ContentProductCard from "@/components/cards/ContentProductCard";
import ContentCardSkeleton from "@/components/cards/ContentCardSkeleton";
import { useProducts } from "../../product/product.hook";
import Modal from "@/components/Modal/Modal";
import SkeletonContentCard from "../../contents/Skeleton";
import { IoCheckmarkCircle, IoRemoveCircleOutline } from "react-icons/io5";
import CopyClipboard from "@/components/ui/copyToClipBoard";
import {
  addProductsToCollection,
  deleteCollection,
  // getCollectionById,
  getCollections,
  removeProductFromCollection,
  toggleOneCollection,
} from "@/services/collection";
import { toast } from "react-toastify";
import { ProductsByType, getAllProducts } from "@/services/products";
import { useRouter } from "next-nprogress-bar";
import { useCollectionProducts } from "./listProducts.hook";
import Image from "next/image";

const ListProductCard = ({ data, isSelected, onCheckboxChange }: any) => {
  if (!data) {
    return <SkeletonContentCard />;
  }

  const handleCardClick = () => {
    onCheckboxChange(data._id);
  };

  return (
    <div
      className={`relative  rounded-md pr-4 my-6 min- w-[250px] shadow-md hover:cursor-pointer hover:shadow-lg max-w-[330px] transition-colors duration-300 ${
        isSelected ? "bg-gray-200" : "bg-white"
      }`}
      onClick={handleCardClick}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-50">
          <IoCheckmarkCircle size={24} color="green" />
        </div>
      )}
      <div className="relative h-[85px]">
        <div className="flex justify-start items-center gap-x-3">
          <div className="flex justify-center">
            <Image
              src={data?.image}
              alt=""
              width={90}
              height={85}
              className="rounded-md mb-3 h-[85px] w-[90px] hover:scale-105 transition duration-500"
            />
          </div>
          <h2 className="mb-3 font-semibold text-sm text-center">
            {data.name}
          </h2>
        </div>
        <div>
          <div className="flex justify-evenly my-2">
            {/* <div>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => e.stopPropagation()}
                onClick={handleCardClick}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
const ListCollectionProducts = ({ id }: any) => {
  const {
    isOpen,
    isLoading,
    collection,
    products,
    selectedProductIds,
    handleModal,
    handleCheckboxChange,
    AddProductsToCollection,
    removeProduct,
    viewContent,
    toggleStatus,
  } = useCollectionProducts(id);

  if (isLoading) {
    return <ContentCardSkeleton />;
  }
  // Filter out products that are already in the collection
  const availableProducts = products.filter(
    (product: any) =>
      !collection?.products.some(
        (colProduct: any) => colProduct._id === product._id
      )
  );

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-[8px]">
          Products in collections
        </h2>
        <Button label="Add Product to Collection" onClick={handleModal} />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {collection && collection.products ? (
          collection.products.length > 0 ? (
            collection.products.map((product: any) => (
              <ContentProductCard
                key={product._id}
                data={product}
                removeProduct={removeProduct}
                collection={collection}
              />
            ))
          ) : (
            <p>No products found in this collection.</p>
          )
        ) : (
          <p>Collection not found.</p>
        )}
      </div>
      <Modal onClose={handleModal} isOpen={isOpen}>
        <p>Select the Product you want to add to this collection</p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-3">
          {availableProducts.map((product: any) => (
            <ListProductCard
              key={product._id}
              data={product}
              collection={collection}
              // @ts-ignore
              isSelected={selectedProductIds.includes(product._id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
        <div className="w-full flex justify-end pr-5">
          <Button
            label="Add"
            variant="custom"
            className="bg-blue-500 text-white hover:bg-blue-600 w-[80px]"
            disabled={selectedProductIds.length === 0}
            onClick={AddProductsToCollection}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListCollectionProducts;
