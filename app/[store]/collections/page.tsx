"use client"
import { useStoreLayout } from "@/components/layouts/Layout.hook";
import StoreLayout from "@/components/layouts/StoreLayout";
import StoreNotFound from "@/components/storeFront/StoreNotFound";
import Collections from "@/components/storeFront/collection/Collections";
import React from "react";
// import { CollectionData } from "@/utils/data";
const StoreCollections = () => {
  const {
    open,
    toggleSideBar,
    storeData,
    storeNotFound,
    storeName,
    isLoading,
  } = useStoreLayout();
  if (storeNotFound) {
    return <StoreNotFound />;
  }
  return (
    <StoreLayout
      store={storeName}
      open={open}
      toggleSideBar={toggleSideBar}
      storeData={storeData}
      switchNavbar={true}
      title="My Collections"
    >
      <div className="mt-12">
        <Collections />
      </div>
    </StoreLayout>
  );
};

export default StoreCollections;
