"use client";

// import { useCollections } from "@/components/dashboard/collections/collection.hooks";
import ListCollectionProducts from "@/components/dashboard/collections/products/listCollectionProducts";
import DashboardLayout from "@/components/layouts/DashboardLayout";
// import { getCollectionById } from "@/services/collection";
import React, { useEffect, useState } from "react";

const GetCollection = ({ params }: any) => {
  const id = params.slug;
  // const {
  //   collections,
  //   getCollectionProducts,
  //   collectionProduct,
  //   isLoading,
  //   filtered,
  //   setIsFiltered,
  //   removeProduct,
  // } = useCollections();
  // const [collection, setCollection] = useState(null);

  // useEffect(() => {
  //   setIsFiltered(true);
  //   const findCollection = async () => {
  //     const getCollection = await getCollectionById(id);
  //     if (getCollection.success) {
  //       setCollection(getCollection.data?.data);
  //     }
  //   };
  //   findCollection();
  // }, [collections, id]);
  // useEffect(() => {
  //   if (collection) {
  //     const obj = {
  //       type: "collection",
  //       // @ts-ignore
  //       typeId: collection._id,
  //     };
  //     getCollectionProducts(obj);
  //   }
  // }, [collection]);

  return (
    <DashboardLayout>
      <ListCollectionProducts
        id={id}
      />
    </DashboardLayout>
  );
};

export default GetCollection;
