import SwitchDemo from "@/components/input/Switch";
import Image from "next/image";
import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { FaGripLines } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineShare } from "react-icons/md";

const ProductCard = ({ data, deleteProduct, toggle, router }: any) => {
  const goToEditPage = () => {
    router.push(`/dashboard/products/edit/${data?.slug}`);
  };
  return (
    <div
      className="relative grid lg:grid-cols-5 md:grid-cols-5 grid-cols-3 w-full bg-white my-4 py-2 px-[20px] rounded-lg shadow-md"
      key={data.name}
    >
      <FaGripLines
        size={18}
        className="hover:cursor-pointer lg:left-[40px] left-[20px] top-[50px] lg:absolute md:relative absolute"
      />
      <div className="flex lg:justify-end md:justify-center lg:pr-6 max-[772px]:col-span-3 lg:pb-0 md:pb-0 pb-2 justify-center items-center gap-x-6 ">
        <Image
          src={
            data.image ||
            "https://shoplinky-stage.s3.amazonaws.com/CommonData/Dummy.png"
          }
          alt=""
          width={90}
          height={85}
          className="rounded-md h-[85px] w-[90px]"
        />
      </div>
      <div className="max-w-[30rem] col-span-3">
        <h3 className="font-semibold">{data.name}</h3>
        <p className="text-[#767676] text-sm">{data.description}</p>
        <div className="flex lg:justify-start md:justify-start justify-center font-semibold gap-4 lg:my-2 md:my-1 my-3">
          <h4 className="my-2">Price: ${data.price}</h4>
          <div className="border"></div>
          <h4 className="my-2">Commission: {data.discount}%</h4>
        </div>
      </div>
      <div className="flex justify-end lg:col-span-1 md:col-span-1 col-span-3 items-center gap-2 px-3">
        <div className="text-center">
          <div className="flex justify-center">
            <AiTwotoneEdit size={24} onClick={goToEditPage} />
          </div>
        </div>
        <div className="flex justify-center">
          <SwitchDemo
            toggle={data?.isActive}
            handleToggle={() => toggle(data?.slug)}
          />
        </div>
        <div className={`flex justify-center text-gray-600`}>
          <MdOutlineDelete
            size={24}
            onClick={() => deleteProduct(data?.slug)}
          />
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="relative grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 w-full bg-white my-4 py-2 px-[20px] rounded-lg shadow-md">
      <div className="lg:flex md:flex items-center gap-x-5 w-full sm:col-span-3">
        <FaGripLines
          size={18}
          className="hover:cursor-pointer lg:relative md:relative absolute"
        />
        <div className="flex lg:justify-start md:justify-start lg:col-span-1 md:col-span-1 col-span-3 lg:pb-0 md:pb-0 pb-2 justify-center items-center gap-x-6 w-full">
          <div className="bg-gray-200 rounded-md h-[100px] w-[110px]"></div>
        </div>
      </div>
      <div className="max-w-[30rem] col-span-3">
        <div className="bg-gray-200 h-6 w-1/2 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
        <div className="flex lg:justify-start md:justify-start justify-center font-semibold gap-4 lg:my-1 md:my-1 my-3">
          <div className="bg-gray-200 h-6 w-20 rounded"></div>
          <div className="border"></div>
          <div className="bg-gray-200 h-6 w-24 rounded"></div>
        </div>
      </div>
      <div className="flex justify-end lg:col-span-1 md:col-span-1 col-span-3 items-center gap-2 px-3">
        <div className="h-fit p-1 bg-gray-100 rounded-md">
          <MdOutlineShare size={18} />
        </div>
        <div className="h-fit p-1 bg-gray-100 rounded-md">
          <IoSettingsOutline size={18} />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
