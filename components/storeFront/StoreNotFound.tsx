import React from 'react';

const StoreNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center p-4 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h18M9 3v4m6-4v4M4 9h16M5 9v11h14V9m-7 0v11"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Store Not Found</h2>
        <p className="mt-2 text-gray-500">
          The requested store is not found. Please check the path.
        </p>
      </div>
    </div>
  );
};

export default StoreNotFound;
