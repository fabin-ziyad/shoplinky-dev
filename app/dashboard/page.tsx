"use client";
import { useDashboard } from "@/components/dashboard/dashboard.hooks";
import Overview from "@/components/dashboard/overview";
import ProductTable from "@/components/dashboard/table";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";

const Dashboard = () => {
  const {
    currentItems,
    currentPage,
    endItem,
    setSearchTerm,
    setSortOrder,
    sortedData,
    startItem,
    state,
    totalPages,
    setCurrentPage,
  } = useDashboard();
  return (
    <DashboardLayout>
      <Overview currentItems={currentItems} />
      <ProductTable
        currentItems={currentItems}
        currentPage={currentPage}
        endItem={endItem}
        setSearchTerm={setSearchTerm}
        setSortOrder={setSortOrder}
        sortedData={sortedData}
        startItem={startItem}
        state={state}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
