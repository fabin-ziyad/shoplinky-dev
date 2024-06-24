"use client";
import React from "react";
import { Products } from "@/utils/data";
import ProductCard from "../../Products/ProductCard";
import NoProductsFound from "../../Products/NoProductsFound";

const ListProductsForPosts = ({ data, user }: any) => {
    return (
        <div className="relative pt-[30px]">
            {/* The fixed container for the large image (now commented out) */}
            <div className="fixed top-[65px] left-1/2 transform -translate-x-1/2 w-full max-h-[400px] lg:max-w-[43%] z-0 overflow-hidden">
                {/* <img
          alt="Holiday Collection"
          className="aspect-square h-full w-full object-cover"
          src={"/images/post-1.png"}
        /> */}
                <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-gray-900 to-transparent rounded-b-sm" />
                <h2 className="absolute bottom-0 lg:pl-4 pl-2 pb-3 text-white">
                    {data?.name || "NA"}
                </h2>
            </div>

            {/* Adjust the top padding to reduce the gap */}
            <div className="pt-[2px] lg:pt-[1px]">
                <div className="w-full bg-white/90 backdrop-blur z-10 px-1 py-1 rounded-t-xl">
                    <h2 className="text-left text-medium text-gray-600 font-bold my-2 px-3">
                        Products associated to this Post
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

export default ListProductsForPosts;
