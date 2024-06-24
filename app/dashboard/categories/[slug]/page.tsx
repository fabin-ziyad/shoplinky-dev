import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListCategory from "@/components/dashboard/category";
import React from "react";
import ListCategoryItems from "@/components/dashboard/category/categoryItems/contents";

const Categories = ({ params }: any) => {
  const id = params.slug;
  return (
    <DashboardLayout>
      <ListCategoryItems slug={id} />
    </DashboardLayout>
  );
};

export default Categories;
