"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import ContentCard from "@/components/cards/ContentCard";
import { useRouter } from "next/navigation";
import { useContents } from "./contents.hooks";
import ContentCardSkeleton from "@/components/cards/ContentCardSkeleton";
const ListContents = () => {
  const {
    allContents,
    isLoading,
    deleteOneContent,
    toggleContent,
    toggleStatus,
    contentStatuses,
  } = useContents();
  const router = useRouter();
  const [contentType, setContentType] = useState("all");
  const [uniqueContentTypes, setUniqueContentTypes] = useState<any>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);

  useEffect(() => {
    const typesSet = new Set(allContents.map((content: any) => content.type));
    setUniqueContentTypes(Array.from(typesSet));
  }, [allContents]);

  useEffect(() => {
    setFilteredContent(() => {
      return contentType === "all"
        ? allContents
        : allContents.filter((content: any) => content.type === contentType);
    });
  }, [contentType, allContents]);

  const handleAddContentPath = () => {
    router.push("/dashboard/contents/add");
  };
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Contents</h2>
        <Button label="Add New Content" onClick={handleAddContentPath} />
      </div>
      <div className="flex gap-x-6 items-center mb-3">
        <input
          type="search"
          name=""
          id=""
          placeholder="Search content here..."
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
      <div className="flex mb-3 gap-3 w-full overflow-scroll">
        <div
          className={`border border-1 px-10 py-1 rounded-sm hover:bg-black transition duration-500 hover:text-white hover:cursor-pointer ${
            contentType == "all" ? "bg-black text-white" : ""
          }`}
          onClick={() => {
            setContentType("all");
          }}
        >
          All
        </div>
        {uniqueContentTypes.map((type: any) => (
          <div
            key={type}
            className={`border border-1 px-10 py-1 rounded-sm hover:bg-black hover:text-white transition duration-500 hover:cursor-pointer capitalize ${
              contentType === type ? "bg-black text-white" : ""
            }`}
            onClick={() => setContentType(type)}
          >
            {type}
          </div>
        ))}
      </div>
      {allContents?.length == 0 && (
        <div className="flex items-center justify-center w-full h-full mt-[10%]">
          <p className="text-center">No Collections found</p>
        </div>
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-3 pt-3 gap-8 justify-center mx-auto ">
        {isLoading && (
          <div className="w-full flex justify-center">
            <ContentCardSkeleton />
          </div>
        )}
        {allContents &&
          allContents.length > 0 &&
          filteredContent.map((content: any) => (
            <ContentCard
              key={content.slug}
              data={content}
              deleteContent={deleteOneContent}
              toggle={() => toggleContent(content.slug)}
              status={contentStatuses[content.slug]}
            />
          ))}
      </div>
    </div>
  );
};

export default ListContents;
