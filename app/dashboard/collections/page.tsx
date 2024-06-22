import Button from "@/components/button/Button";
import AllCollections from "@/components/dashboard/collections";
import CollectionListCard from "@/components/dashboard/collections/collectionCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <DashboardLayout>
      <AllCollections />
    </DashboardLayout>
  );
};

export default Collections;
