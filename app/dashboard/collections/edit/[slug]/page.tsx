"use client";
import React from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddCollections from "@/components/dashboard/collections/addCollections";
import EditCollection from "@/components/dashboard/collections/editCollection";

const AddCollectionPage = ({ params }: any) => {
  const slug = params.slug;
  return (
    <DashboardLayout>
      <EditCollection slug={slug} />
    </DashboardLayout>
  );
};

export default AddCollectionPage;
