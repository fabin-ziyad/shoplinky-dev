"use client";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import AllProducts from "@/components/dashboard/product";
const Products = () => {
  return (
    <DashboardLayout>
      <div className="relative w-full">
        <AllProducts />
      </div>
    </DashboardLayout>
  );
};

export default Products;
