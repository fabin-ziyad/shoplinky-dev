"use client";
import React from "react";
import StoreLayout from "@/components/layouts/StoreLayout";
import MainHome from "@/components/storeFront/MainHome";
import { useRouter, useParams } from "next/navigation";
import { useStoreLayout } from "@/components/layouts/Layout.hook";
import StoreNotFound from "@/components/storeFront/StoreNotFound";

const StoreFront = () => {
  const {
    open,
    toggleSideBar,
    storeData,
    storeNotFound,
    storeName,
    isLoading
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
    >
      <MainHome storeData={storeData} loading={isLoading} />
    </StoreLayout>
  );
};

export default StoreFront;
