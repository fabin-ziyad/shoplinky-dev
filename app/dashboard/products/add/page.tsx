"use client"

import DashboardLayout from "@/components/layouts/DashboardLayout";
import AddProduct from "@/components/dashboard/product/addProduct";
import React from "react";

const AddNewProduct = () => {
  return (
    <DashboardLayout>
      <AddProduct />
    </DashboardLayout>
  );
};

export default AddNewProduct;
