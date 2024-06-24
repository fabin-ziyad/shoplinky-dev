"use client";
import React, { useState, useMemo } from "react";
import { TableData } from "@/utils/constants";
import { FcNext, FcPrevious } from "react-icons/fc";
import Link from "next/link";
import Button from "../button/Button";
import { useDashboard } from "./dashboard.hooks";
const ProductTable = ({
  currentItems,
  currentPage,
  endItem,
  setSearchTerm,
  setSortOrder,
  sortedData,
  startItem,
  state,
  totalPages,
  setCurrentPage,
}: any) => {
  return (
    <div className="bg-white rounded-lg mt-10 shadow-md">
      <div className="flex flex-col w-full gap-4">
        <div className="overflow-auto  rounded-lg ">
          <div className="lg:flex md:flex block justify-between lg:px-8 md:px-6 px-3 lg:py-6 md:py-3 py-2">
            <h2 className="text-xl font-semibold pb-3">All Products</h2>
            <Link href={"/dashboard/products/add"}>
              <Button label="Add Product" className="w-[120px]" />
            </Link>
          </div>
          <div className="w-full flex lg:justify-between justify-start lg:px-8 px-2 lg:mb-1 md:mb-3 mb-8">
            <div className="flex gap-x-6 items-center">
              <input
                type="search"
                name=""
                id=""
                placeholder="Search product here..."
                className="lg:w-[232px] h-[30px] w-full bg-gray-100 rounded-full text-sm px-3 lg:py-1 py-1 lg:m-0 mb-2 lg:mt-0 mt-4 outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex gap-x-5 items-center lg:pt-0 pt-1 ">
                <select
                  name=""
                  id=""
                  className="bg-gray-100 rounded-full px-3 py-1 h-[30px] text-sm"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="Newest">Newest</option>
                  <option value="inactive">InActive</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
          </div>
          <div className="relative w-full overflow-auto mt-3">
            <table className="w-full">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors">
                  <th className="h-12 px-4 text-left align-middle font-medium max-w-[150px]">
                    Product Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium  max-w-[100px]">
                    Brand
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Product Price
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Total Sales
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Total Earnings
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium ">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {/* {!state && <h2>Loading...</h2>} */}
                {currentItems.map((data: any, index: any) => (
                  <tr
                    key={index}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="px-4 py-4 align-middle text-sm  ">
                      {data.name}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm ">
                      {data.brand || "NA"}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm ">
                      {data.price}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm ">
                      {data.totalSales || "NA"}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm ">
                      {data.totalErnings || "NA"}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm ">
                      {data.isActive ? (
                        <div className="bg-green-400 w-fit text-sm text-white rounded-full px-3 py-1">
                          Active
                        </div>
                      ) : (
                        <div className="bg-red-500 w-fit text-sm text-white rounded-full px-3 py-1">
                          InActive
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 pb-3 flex items-center justify-between w-full">
          <h3 className="text-gray-500 text-sm">
            Showing Data {startItem} to {endItem} of {sortedData.length} Entries
          </h3>
          <div className="flex items-center gap-2 ">
            {/* Pagination controls */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FcPrevious size={22} />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FcNext size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
