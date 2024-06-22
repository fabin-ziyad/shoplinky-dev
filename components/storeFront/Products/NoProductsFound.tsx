import React from 'react';

const NoProductsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 ">
      <svg
        className="w-20 h-20 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M8.433 7.867a1 1 0 00-1.414 1.414l-2 2a1 1 0 00-1.414-1.414L4.586 5.586a1 1 0 011.414-1.414l2 2a1 1 0 001.414 1.414zM10 8a1 1 0 010-2h.586a1 1 0 01.707.293l2 2a1 1 0 01-.293.707H10z" />
        <path
          fillRule="evenodd"
          d="M2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414L12 10.586V16a1 1 0 01-1 1H8a1 1 0 01-1-1v-5.414l-2.293 2.293a1 1 0 01-1.414-1.414L2 8z"
          clip-rule="evenodd"
        />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! No Products Found</h2>
      <p className="text-gray-500 text-lg mt-2">
        We couldnt find any products matching your criteria.
      </p>
      {/* <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Browse All Products
      </button> */}
    </div>
  );
};

export default NoProductsFound;
