"use client";
import { useUpdateContent } from "@/components/dashboard/contents/contents.hooks";
import EditContent from "@/components/dashboard/contents/updateContent";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useRouter } from "next-nprogress-bar"
import React, { useEffect } from "react";

const EditContents = ({ params }: any) => {
  const id = params.slug;
  const {
    handleUpdateContent,
    content,
    validationSchema,
    handleImageChange,
    initialValues,
    isLoading,
  } = useUpdateContent(id);
  const router = useRouter();
  const cancelUpdate = () => {
    router.push("/dashboard/contents");
  };
  return (
    <DashboardLayout>
      <EditContent
        id={id}
        handleUpdateContent={handleUpdateContent}
        content={content}
        validationSchema={validationSchema}
        handleImageChange={handleImageChange}
        initialValues={initialValues}
        handlecancel={cancelUpdate}
        loading={isLoading}
      />
    </DashboardLayout>
  );
};

export default EditContents;
