"use client";
import React from "react";
import AddProduct, { ProductForm } from "./addProduct";
import Button from "@/components/button/Button";
import CustomMultiSelect from "@/components/input/CustomMultiSelect";
import CustomTextArea from "@/components/input/CustomTextArea";
import CustomTextInput from "@/components/input/CustomTextField";
import UploadImages from "@/components/input/ImageUploader";
import { Formik, Form } from "formik";
import { useUpdateProduct } from "./product.hook";
import { useCollection } from "../collections/collection.hooks";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

const EditProduct = ({ slug }: any) => {
  const {
    initialValues,
    validationSchema,
    handleImageChange,
    cancelRouting,
    updateProduct,
    isLoading,
  } = useUpdateProduct(slug);
  const { allCollections } = useCollection();

  if (!initialValues) {
    return (
      <div>
        <EditProductLoader />
      </div>
    );
  }
  return (
    <div className="mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={updateProduct}
      >
        <Form className="lg:w-[90%] w-full">
          <div className="bg-[#f2f2f2] py-5 px-[24px]">
            <div className="mt-5">
              <CustomTextInput
                key={"name"}
                name={"name"}
                label={"Product Name"}
                placeholder={""}
                type={"text"}
              />
            </div>

            <div className="mt-6">
              <CustomTextArea
                name="description"
                type="text"
                cols={10}
                rows={10}
                placeholder="Description"
                label="Description"
              />
            </div>
          </div>
          <div className="mt-5 bg-[#f2f2f2] p-5">
            <UploadImages
              onChange={handleImageChange}
              initialImage={initialValues.image}
            />
          </div>
          <div className="mt-5 bg-[#f2f2f2] p-5">
            <h3 className="font-semibold">Pricing</h3>
            <div className="md:flex gap-6 mt-3 block">
              <div className="my-2">
                <CustomTextInput
                  key={"price"}
                  name={"price"}
                  label={"Price"}
                  placeholder={"INR 20"}
                  type={"text"}
                />
              </div>
              <div className="my-2">
                <CustomTextInput
                  key={"discount"}
                  name={"discount"}
                  label={"Discount"}
                  placeholder={"20%"}
                  type={"text"}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 bg-[#f2f2f2] p-5">
            <CustomTextInput
              key={"link"}
              name={"link"}
              label={"Product Link"}
              placeholder={"Add Product Link (www.fenta.com/abcshirt)"}
              type={"text"}
            />
          </div>
          <div className="mt-5 bg-[#f2f2f2] p-5">
            <CustomMultiSelect
              name="collections"
              categories={allCollections}
              label="Collection"
              selectedIds={initialValues?.collections}
            />
            <div className="flex gap-3 mt-5 justify-end">
              <Button
                label="Cancel"
                className="w-[110px] hover:bg-red-500 hover:text-white"
                onClick={cancelRouting}
              />
              <Button
                label={isLoading ? "Updating..." : "Update"}
                type="submit"
                disabled={isLoading}
                className="w-[110px]"
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProduct;

const EditProductLoader = () => {
  return (
    <div>
      <div className="bg-[#f2f2f2] py-5 px-[24px]">
        <SkeletonLoader width="60%" height="40px" />
        <SkeletonLoader width="100%" height="100px" />
      </div>
      <div className="mt-5 bg-[#f2f2f2] p-5">
        <SkeletonLoader width="100%" height="200px" />
      </div>
      <div className="mt-5 bg-[#f2f2f2] p-5">
        <SkeletonLoader width="60%" height="40px" />
        <div className="md:flex gap-6 mt-3 block">
          <SkeletonLoader width="45%" height="40px" />
          <SkeletonLoader width="45%" height="40px" />
        </div>
      </div>
      <div className="mt-5 bg-[#f2f2f2] p-5">
        <SkeletonLoader width="100%" height="40px" />
      </div>
      <div className="mt-5 bg-[#f2f2f2] p-5">
        <SkeletonLoader width="100%" height="40px" />
        <div className="flex gap-3 mt-5 justify-end">
          <SkeletonLoader width="110px" height="40px" />
          <SkeletonLoader width="110px" height="40px" />
        </div>
      </div>
    </div>
  );
};
