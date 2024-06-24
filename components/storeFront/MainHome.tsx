"use client";
import React from "react";
import ProfileCard from "./Profile";
import TabNav from "./posts/TabNav";
import { useStore } from "./store.hooks";
import { getStoreData } from "@/store/storeFront";

const MainHome = ({ storeData, loading }: any) => {
  return (
    <div>
      <ProfileCard data={storeData} loading={loading} />
      <TabNav />
    </div>
  );
};

export default MainHome;
