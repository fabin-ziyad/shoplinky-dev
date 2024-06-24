"use client";
import Button from "@/components/button/Button";
import React, { useState } from "react";
import CollectionListCard from "./collectionCard";
import { useCollection } from "./collection.hooks";

const AllCollections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allCollections, addCollectionPage } = useCollection();
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-[8px]">Collections</h2>

        <Button
          label="Add Collections"
          className="w-[155px]"
          onClick={addCollectionPage}
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

        {allCollections?.length == 0 && (
          <div className="flex items-center justify-center w-full h-full mt-[10%]">
            <p className="text-center">No Collections found</p>
          </div>
        )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {allCollections.map((data: any, index: number) => (
          <CollectionListCard data={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllCollections;
