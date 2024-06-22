"use client";
import React, { useState } from "react";
import { Contents } from "@/utils/data";
import { ContentTypes } from "@/utils/data";
import Button from "@/components/button/Button";
import { BsToggle2Off } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineSort } from "react-icons/md";

import Modal from "@/components/Modal/Modal";
import AddCategory from "./addCategory";
import SwitchDemo from "@/components/input/Switch";
import { useCategories } from "./category.hooks";
const ListCategory = () => {
  const {
    createNewCategory,
    addCat,
    categories,
    deafultInitialValues,
    handleAddCatModal,
    isLoading,
    validationSchema,
    deleteCategory,
    toggleCategory,
    viewCategory,
  } = useCategories();
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-[8px]">Categories</h2>

        <Button
          label="Add Catgeory"
          className="w-[155px]"
          onClick={handleAddCatModal}
        />
      </div>
      <div className="flex gap-x-6 items-center mb-2 ">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search collection here..."
          className="lg:w-[40%] h-[40px] w-full bg-gray-100 rounded-md text-sm px-3 lg:py-1 py-1 lg:m-0 mb-2 lg:mt-0 mt-4 outline-none"
          // onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="overflow-x-scroll">
        <table className="min-w-full bg-white rounded-lg overflow-hidden border-separate border-spacing-y-3">
          <thead className="text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">
                <MdOutlineSort size={24} />
              </th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {categories && categories.length ? (
              categories.map((data: any, index: number) => (
                <tr className="bg-white border-b border-gray-200 rounded-lg overflow-hidden shadow-[0_3px_10px_rgb(0,0,0,0.2)]" key={index}>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {data?.name}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    {data?.type}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200">
                    <SwitchDemo
                      toggle={data?.isActive}
                      handleToggle={() => toggleCategory(data?.slug)}
                    />
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 flex items-center gap-2">
                    <div className="h-fit w-fit p-1 bg-white text-black hover:cursor-pointer hover:bg-black hover:text-white rounded-md transition duration-500 ease-in-out transform hover:translate-y-[-4px] hover:cursor-pointer shadow-md">
                      <FaRegEye
                        size={24}
                        onClick={() => viewCategory(data?.slug)}
                      />
                    </div>
                    <div className="h-fit w-fit p-1 bg-white text-black hover:cursor-pointer hover:bg-black hover:text-white rounded-md transition duration-500 ease-in-out transform hover:translate-y-[-4px] hover:cursor-pointer shadow-md">
                      <MdOutlineEdit size={24} />
                    </div>
                    <div className="h-fit w-fit p-1 bg-red-500 text-white hover:cursor-pointer hover:bg-red-600 rounded-md transition duration-500 ease-in-out transform hover:translate-y-[-4px] hover:cursor-pointer shadow-md">
                      <MdOutlineDelete
                        size={24}
                        onClick={() => deleteCategory(data?.slug)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <h2 className="w-full">No Category found</h2>
            )}
          </tbody>
        </table>
      </div>
      {addCat && (
        <>
          <Modal
            isOpen={addCat}
            onClose={handleAddCatModal}
            title="Add New Category"
          >
            <AddCategory
              addCategory={createNewCategory}
              initialValues={deafultInitialValues}
              schema={validationSchema}
              loading={isLoading}
            />
          </Modal>
        </>
      )}
    </div>
  );
};

export default ListCategory;
