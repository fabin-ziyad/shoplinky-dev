import React from "react";

import Button from "@/components/button/Button";
import ContentProductCard from "@/components/cards/ContentProductCard";
import SkeletonContentCard from "../Skeleton";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useContentProducts } from "./contentProduct.hooks";
import Modal from "@/components/Modal/Modal";
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
const ListContentProducts = ({ slug }: any) => {
  const {
    contentProducts,
    handleModal,
    openModal,
    handleCheckboxChange,
    selectedProductIds,
    AddProductsToCollection,
    contentData,
    removeContentProduct,
    isLoading,
  } = useContentProducts(slug);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mb-[8px]">Products in Content</h2>
        <Button label="Add Product to Content" onClick={handleModal} />
      </div>
      <div className="grid lg:grid-cols-2  grid-cols-1 gap-6 mt-4">
        {contentData?.products.length > 0 ? (
          contentData.products?.map((product: any) => (
            <ContentProductCard
              key={product.slug}
              data={product}
              removeProduct={removeContentProduct}
              type={contentData}
            />
          ))
        ) : (
          <p>No products found in this collection.</p>
        )}
      </div>
      <Modal onClose={handleModal} isOpen={openModal}>
        <p>Select the Product you want to add to this collection</p>
        <div className="grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 lg:gap-6 gap-6 px-3">
          {contentProducts.map((product: any) => (
            <ListProductCard
              key={product._id}
              data={product}
              // @ts-ignore
              isSelected={selectedProductIds.includes(product._id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
        <div className="w-full flex justify-end pr-5">
          <Button
            label={isLoading ? "Adding..." : "Add"}
            variant="custom"
            className="bg-blue-500 text-white hover:bg-blue-600 w-[110px]"
            disabled={selectedProductIds.length === 0 || isLoading}
            onClick={AddProductsToCollection}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListContentProducts;
