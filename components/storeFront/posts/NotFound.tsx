import React from 'react';
import { FaSadTear } from 'react-icons/fa';

const NoPostsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-4xl text-gray-500 mb-4">
        <FaSadTear />
      </div>
      <p className="text-lg text-gray-500">No Posts Found</p>
    </div>
  );
};

export default NoPostsFound;
