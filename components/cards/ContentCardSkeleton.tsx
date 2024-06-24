import React from "react";

const ContentCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md px-[14px] py-[12px] my-6 shadow-md hover:cursor-pointer hover:shadow-lg max-w-[330px] animate-pulse">
      <div className="relative">
        <div className="rounded-md mb-3 h-[290px] w-full bg-gray-200"></div>
        <div>
          <div className="mb-3 h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="flex justify-between my-2">
            <div>
              <div className="text-sm text-gray-400 h-4 w-10 bg-gray-200 mb-1 rounded"></div>
              <div className="flex justify-center text-gray-600 h-6 w-6 bg-gray-200 rounded"></div>
            </div>

            <div>
              <div className="text-sm text-gray-400 h-4 w-10 bg-gray-200 mb-1 rounded"></div>
              <div className="flex justify-center h-6 w-12 bg-gray-200 rounded"></div>
            </div>

            <div>
              <div className="text-sm text-gray-400 h-4 w-10 bg-gray-200 mb-1 rounded"></div>
              <div className="flex justify-center text-gray-600 h-6 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCardSkeleton;
