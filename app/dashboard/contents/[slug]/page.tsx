"use client";
import { useContents } from "@/components/dashboard/contents/contents.hooks";
import ListContentProducts from "@/components/dashboard/contents/products/productsInContent";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getContentBySlug } from "@/services/content";
import { Contents, Products } from "@/utils/data";
import React, { useEffect, useState } from "react";

const getContent = ({ params }: any) => {
  const id = params.slug;


  // if (!contentData) {
  //   return <p>Collection not found</p>;
  // }

  
  return (
    <DashboardLayout>
      <ListContentProducts slug={id}  />
    </DashboardLayout>
  );
};

export default getContent;
