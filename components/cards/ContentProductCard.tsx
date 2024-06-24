import React from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import SkeletonContentCard from "../dashboard/contents/Skeleton";
import { hoverScale110 } from "@/utils/constants";
import CopyClipboard from "../ui/copyToClipBoard";
import Image from "next/image";
const ContentProductCard = ({ data, removeProduct, type }: any) => {
  console.log(data)
  if (!data) {
    return <SkeletonContentCard />;
  }
  return (
    <div className="bg-white rounded-md px-[14px] py-[12px] my-6 shadow-md hover:cursor-pointer hover:shadow-lg  max-w-[330px]">
      <div className="relative">
        <div className="flex justify-center ">
          <Image
            src={data?.image}
            alt=""
            width={220}
            height={220}
            priority
            className={`rounded-md mb-3 h-[220px] w-[220px] hover:scale-105 transition duration-500`}
          />
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-sm">{data.name || data?.title ||"NA"}</h2>
          <div className="flex justify-evenly my-2">
            <div>
              <p className="text-sm text-gray-400">Remove</p>
              <div
                className={`flex justify-center text-gray-600 ${hoverScale110}`}
              >
                <IoRemoveCircleOutline
                  size={24}
                  onClick={() => removeProduct(type?.slug,data?._id)}
                />
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400">Copy</p>
              <div
                className={`flex justify-center text-gray-600 ${hoverScale110}`}
              >
                <CopyClipboard
                  value={`${process.env.NEXT_PUBLIC_URL}/dashboard/products/${data._id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentProductCard;
