"use client";
import StoreLayout from "@/components/layouts/StoreLayout";
import ListProducts from "@/components/storeFront/collection/Products/ListProducts";
import { useFetchCollectionData } from "@/components/storeFront/collection/collection.hooks";
import React from "react";

const CollectionItem = () => {
  const { collections, getUserName } = useFetchCollectionData();
  return (
    <StoreLayout
      storeData={getUserName}
      switchNavbar={true}
      title="My Collections"
    >
      <div className="flex justify-center mt-5">
        <ListProducts data={collections} user={getUserName} />
      </div>
    </StoreLayout>
  );
};

export default CollectionItem;
