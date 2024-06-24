"use client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";

import Link from "next/link";
import CustomTextArea from "@/components/input/CustomTextArea";
import CustomTextInput from "@/components/input/CustomTextField";
import FileComponent from "@/components/input/UploadField";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ViewCollections from "@/components/dashboard/collections/addCollections";
import AddCollections from "@/components/dashboard/collections/addCollections";

const AddCollectionPage = () => {
  
  return (
    <DashboardLayout>
      <AddCollections />
    </DashboardLayout>
  );
};

export default AddCollectionPage;
