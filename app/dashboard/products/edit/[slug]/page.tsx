import React from "react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import EditProduct from "@/components/dashboard/product/editProduct";

const EditProducts = ({ params }: any) => {
  const slug = params.slug;
  return (
    <DashboardLayout>
      <EditProduct slug={slug} />
    </DashboardLayout>
  );
};

export default EditProducts;
