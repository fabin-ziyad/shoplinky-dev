"use client"
import ListContents from "@/components/dashboard/contents";
import AddContent from "@/components/dashboard/contents/addContent";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const AddContents = () => {
  return (
    <DashboardLayout>
      <AddContent />
    </DashboardLayout>
  );
};

export default AddContents;
