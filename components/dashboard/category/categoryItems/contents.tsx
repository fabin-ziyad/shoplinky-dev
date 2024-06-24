"use client";
import Button from "@/components/button/Button";
import ContentProductCard from "@/components/cards/ContentProductCard";
import Modal from "@/components/Modal/Modal";
import { useContentProducts } from "../../contents/products/contentProduct.hooks";
import { IoCheckmarkCircle } from "react-icons/io5";
import SkeletonContentCard from "../../contents/Skeleton";
import { useCategoryItems } from "./categoryItems.hooks";
import Image from "next/image";

const ListProductCard = ({ data, isSelected, onCheckboxChange }: any) => {
  console.log("####", data);
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
              alt="prdt"
              width={90}
              height={90}
              className="rounded-md mb-3 h-[85px] w-[90px] hover:scale-105 transition duration-500"
            />
          </div>
          <h2 className="mb-3 font-semibold text-sm text-center">
            {data.name || data?.title}
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
const ListCategoryItems = ({ slug }: any) => {
  const {
    categoryData,
    handleModal,
    openModal,
    isLoading,
    contentItems,
    handleCheckboxChange,
    selectedItemIDs,
    addItemsToCategory,
    removeItemsFromCategory,
    isInitialLoading,
  } = useCategoryItems(slug);
  console.log(categoryData);
  return (
    <>
      <div className="flex justify-between">
        {
          <h2 className="text-lg font-semibold mb-[8px]">
            {`${categoryData?.type} in`} Category
          </h2>
        }
        <Button
          label={`Add ${categoryData?.type} to Category`}
          onClick={handleModal}
        />
      </div>
      <div className="grid lg:grid-cols-2  grid-cols-1 gap-6 mt-4">
        {categoryData?.items?.length > 0 ? (
          categoryData?.items?.map((product: any) => (
            <ContentProductCard
              key={product?.slug}
              data={product}
              removeProduct={removeItemsFromCategory}
              type={categoryData}
            />
          ))
        ) : (
          <p>{`No ${categoryData?.type} found in this category`}</p>
        )}
      </div>
      <Modal onClose={handleModal} isOpen={openModal}>
        <p>Select the {categoryData?.type} you want to add to this category</p>
        <div className="grid lg:grid-cols-3 w-full md:grid-cols-2 grid-cols-1 lg:gap-6 gap-6 px-3">
          {contentItems.map((item: any) => (
            <ListProductCard
              key={item._id}
              data={item}
              // @ts-ignore
              isSelected={selectedItemIDs.includes(item._id)}
              onCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
        <div className="w-full flex justify-end pr-5">
          <Button
            label={isLoading ? "Adding..." : "Add"}
            variant="custom"
            className="bg-blue-500 text-white hover:bg-blue-600 w-[110px]"
            disabled={selectedItemIDs.length === 0 || isLoading}
            onClick={addItemsToCategory}
          />
        </div>
      </Modal>
    </>
  );
};

export default ListCategoryItems;
