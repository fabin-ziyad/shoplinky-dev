"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import SwitchDemo from "@/components/input/Switch";
import SkeletonContentCard from "../dashboard/contents/Skeleton";
import { hoverScale110 } from "@/utils/constants";
import Button from "../button/Button";
import Image from "next/image";

const ContentCard = ({ data, deleteContent, toggle, status }: any) => {
  const navigate = useRouter();
  const [isPublished, setIsPublished] = useState(true);
  const [showActions, setShowActions] = useState(false);
  if (!data) {
    return <SkeletonContentCard />;
  }
  const viewContent = () => {
    navigate.push(`/dashboard/contents/${data.slug}`);
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-md px-[14px] py-[12px] shadow-md hover:cursor-pointer hover:shadow-lg  max-w-[330px]">
        <div className=" relative">
          <Image
            src={data?.image}
            alt="content"
            width={290}
            height={290}
            className="rounded-md mb-3 h-[290px] w-[290px]"
          />
          <div>
            <h2 className="mb-3 font-semibold">{data.title}</h2>
            <div className="flex justify-center my-2">
              <Button
                variant="custom"
                label={`Associated Products - ${data.products.length || 0}`}
                onClick={viewContent}
                className="bg-blue-700 text-white "
              />
            </div>
            <div className="flex justify-between my-2 mt-4">
              {!showActions ? (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Views</p>
                  <p className="text-sm text-gray-400">1200</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Delete</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <MdOutlineDelete
                      size={24}
                      onClick={() => deleteContent(data?.slug)}
                    />
                  </div>
                </div>
              )}
              {showActions ? (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Edit</p>
                  <div className="flex justify-center">
                    <AiTwotoneEdit
                      size={24}
                      onClick={() =>
                        navigate.push(`/dashboard/contents/edit/${data.slug}`)
                      }
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <div className="flex justify-center">
                    <SwitchDemo toggle={status} handleToggle={toggle} />
                  </div>
                </div>
              )}
              {!showActions ? (
                <div>
                  <p className="text-sm text-gray-400">Action</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <IoSettingsOutline
                      size={23}
                      onClick={() => setShowActions(!showActions)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Close</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <IoCloseSharp
                      size={24}
                      className="flex justify-center"
                      onClick={() => setShowActions(!showActions)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

export const contentCarSkeleton = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-md px-[14px] py-[12px] shadow-md max-w-[330px]">
        <div className="animate-pulse">
          <div className="h-[290px] bg-gray-200 rounded-md mb-3"></div>
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="flex justify-center my-2">
            <div className="bg-gray-200 text-gray-200 rounded-md h-8 w-full"></div>
          </div>
          <div className="flex justify-between my-2 mt-4">
            <div className="text-center">
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
            </div>
            <div className="text-center">
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
            </div>
            <div className="text-center">
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
