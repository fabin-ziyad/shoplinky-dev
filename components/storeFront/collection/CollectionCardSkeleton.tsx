import React from "react";
import Link from "next/link";

const CollectionCardSkeleton = () => {
  return (
    <div className="flex w-full lg:max-h-60 max-h-[122px] rounded-lg border-2 bg-white border-gray-100 animate-pulse">
      <div className="aspect-square lg:h-[210px] h-[120px] lg:max-w-[30%] rounded-md bg-gray-200"></div>
      <div className="flex flex-col justify-between px-4 py-1 w-full">
        <div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="whitespace-normal lg:block md:block hidden">
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mb-1"></div>
          </div>
          <div className="whitespace-normal lg:hidden md:hidden block">
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-3"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-2"></div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;
