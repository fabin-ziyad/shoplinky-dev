"use client";
import React from "react";
import { Products } from "@/utils/data";
import ProductCard from "../../Products/ProductCard";
import { useFetchCollectionData } from "../collection.hooks";
import NoProductsFound from "../../Products/NoProductsFound";

const ListProducts = ({ data, user }: any) => {
  return (
    <div className="relative pt-[30px]">
      {/* Adjust the top padding to reduce the gap */}
      <div className="pt-[2px] lg:pt-[1px]">
        <div className="w-full bg-white/90 backdrop-blur z-10 px-1 py-1 rounded-t-xl">
          {/* Container for the collection name */}
          <div className="px-3">
            <h1 className="text-left text-2xl font-bold text-gray-800 my-2">
              {data?.name || "Collection"}
            </h1>
          </div>
          <h2 className="text-left text-medium text-gray-600 font-bold my-2 px-3">
            Products in this Collection
          </h2>
          <div className="flex flex-col justify-center items-center px-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full pb-4">
              {data?.products?.length ? (
                data?.products?.map((product: any, index: number) => (
                  <ProductCard key={index} data={product} store={user?.store?.name} />
                ))
              ) : (
                <div className="col-span-12">
                  <NoProductsFound />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
