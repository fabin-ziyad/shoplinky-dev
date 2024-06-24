import React, { SVGProps } from "react";
import ProductCard from "./ProductCard";
import NoProductsFound from "./NoProductsFound";
import '@/css/Product.css' 

const ProductListSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-3 w-full bg-white/90 backdrop-blur z-10 animate-pulse">
      <div className="w-full px-4 md:px-2 mb-3">
        <h2 className="text-xl font-semibold mb-4 text-center bg-gray-200 rounded w-1/3 mx-auto h-6"></h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex flex-grow items-center border border-gray-300 rounded-lg p-2">
            <SearchIcon className="text-gray-500 mr-2" />
            <div className="outline-none flex-grow bg-gray-200 h-8 rounded"></div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <div className="bg-gray-200 text-white rounded px-4 py-2 h-10 w-20"></div>
          <div className="bg-gray-200 text-white rounded px-4 py-2 h-10 w-20"></div>
          <div className="bg-gray-200 text-white rounded px-4 py-2 h-10 w-20"></div>
          <div className="bg-gray-200 text-white rounded px-4 py-2 h-10 w-20"></div>
          <div className="bg-gray-200 text-white rounded px-4 py-2 h-10 w-20"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full pb-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
const ProductsList = ({products,loading,store}:any) => {

  if (loading) {
    return <div><ProductListSkeleton/></div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-3 w-full bg-white/90 backdrop-blur z-10">
      <div className="w-full px-4 md:px-2 mb-3">
        <h2 className="text-xl font-semibold mb-4 text-left">Products</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex flex-grow items-center border border-gray-300 rounded-lg p-2">
            <SearchIcon className="text-gray-500 mr-2" />
            <input
              className="outline-none flex-grow bg-transparent"
              placeholder="Search products"
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {/* <Button className="bg-black text-white">All</Button> */}
          {/* <Button variant="outline">Tshirts</Button>
          <Button variant="outline">Jackets</Button>
          <Button variant="outline">Trousers</Button>
          <Button variant="outline">Caps</Button> */}
        </div>
      </div>

      <div className="w-full px-4 sm:px-6"> {/* Added padding here */}
        <div className="product-grid w-full pb-4"> {/* Use the new CSS class */}
          {products?.length ? (
            products.map((product:any, index:number) => (
              <ProductCard key={index} data={product} store={store} />
            ))
          ) : (
            <div className="col-span-12">
              <NoProductsFound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0429 12.1366C14.1019 10.8532 14.7708 9.20705 14.7708 7.39354C14.7708 3.32012 11.4543 0 7.3854 0C3.31646 0 0 3.32012 0 7.39354C0 11.467 3.31646 14.7871 7.3854 14.7871C9.16905 14.7871 10.8412 14.1454 12.1232 13.0573L17.8643 18.8047C18.0037 18.9442 18.1709 19 18.3381 19C18.5053 19 18.6725 18.9442 18.8119 18.8047C19.0627 18.5536 19.0627 18.1072 18.8119 17.8561L13.0429 12.1366ZM7.35754 13.4479C4.0132 13.4479 1.30986 10.7416 1.30986 7.39354C1.30986 4.04552 4.0132 1.33921 7.35754 1.33921C10.7019 1.33921 13.4052 4.04552 13.4052 7.39354C13.4052 10.7416 10.7019 13.4479 7.35754 13.4479Z"
        fill="#B9B9B9"
      />
    </svg>
  );
}

export default ProductsList;
