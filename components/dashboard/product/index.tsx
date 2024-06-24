import { Products } from "@/utils/data";
import React from "react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import Button from "@/components/button/Button";
import Link from "next/link";
import { useProducts } from "./product.hook";

const AllProducts = () => {
  const skeletons = Array.from({ length: 5 });
  const { deleteProduct,products,isLoading,toggleThisProduct,router } = useProducts();
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-[8px]">Products</h2>

        <Link href={"/dashboard/products/add"}>
          {" "}
          <Button label="Add Product" className="w-[155px]" />
        </Link>
      </div>
      <div className="flex gap-x-6 items-center mb-2 ">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search product here..."
          className="lg:w-[40%] h-[40px] w-full bg-gray-100 rounded-md text-sm px-3 lg:py-1 py-1 lg:m-0 mb-2 lg:mt-0 mt-4 outline-none"
        />
        <div className="flex gap-x-5 items-center lg:pt-0 pt-1 ">
          <select
            name=""
            id=""
            className="bg-gray-100 rounded-md px-3 py-1 h-[40px] text-sm border"
            //   onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="inactive">InActive</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        skeletons.map((_, index) => <ProductCardSkeleton key={index} />)
      ) : products.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full mt-[10%]">
          <p className="text-center">No products found</p>
        </div>
      ) : (
        products.map((data: any) => (
          <ProductCard key={data.id} data={data} deleteProduct={deleteProduct} toggle={toggleThisProduct} router={router} />
        ))
      )}
    </div>
  );
};
export default AllProducts;
