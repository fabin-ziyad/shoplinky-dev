// components/SkeletonContentCard.tsx
import React from 'react';

const SkeletonContentCard = () => {
  return (
    <div className="bg-white rounded-md px-[14px] py-[12px] shadow-md max-w-[350px] animate-pulse">
      <div className="rounded-md mb-3 bg-gray-300 h-40"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonContentCard;
