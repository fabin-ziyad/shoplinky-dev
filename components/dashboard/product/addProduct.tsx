"use client";
import React, { useState } from "react";
import { useAddProducts } from "./product.hook";
import { Formik, Form } from "formik";
import CustomTextInput from "../../input/CustomTextField";
import FileComponent from "../../input/UploadField";
import CustomTextArea from "../../input/CustomTextArea";
import Link from "next/link";
import AddProductByUrl from "./addProductByUrl";
import { hasErrors } from "@/utils/common";
import Button from "@/components/button/Button";
import CustomMultiSelect from "@/components/input/CustomMultiSelect";
import UploadImages from "@/components/input/ImageUploader";

export const ProductForm = ({
  switchForm,
  handleSubmit,
  defaultValues,
  validationSchema,
  collections,
  handleImageChange,
  loading,
}: any) => {
  const initialValues = { ...defaultValues };
  return (
    <Formik
      {...{ initialValues, validationSchema }}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {/* {({ errors }) => ( */}
      <Form className="lg:w-[90%] w-full">
        <div className="bg-[#f2f2f2] py-5 px-[24px]">
          <div className="flex justify-between items-center">
            <h2 className="text-right text-lg font-bold">Add New Product</h2>
            <Button label="Add Product By Link" onClick={switchForm} />
          </div>
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
          {/* <FileComponent label="Product Image" name="image" /> */}
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
          {/* <CustomTextInput
              key={"collection"}
              name={"collection"}
              label={"Collections"}
              placeholder={"Add a collection name"}
              type={"text"}
            /> */}
          <CustomMultiSelect
            name="selectedCategories"
            categories={collections}
            label="Collection"
            selectedIds={[]}
          />
          <div className="flex gap-3 mt-5 justify-end">
            <Link href={"/dashboard/products"}>
              <Button
                label="Cancel"
                className="w-[110px] hover:bg-red-500 hover:text-white"
              />
            </Link>
            <Button
              label={loading ? "Creating..." : "Submit"}
              type="submit"
              disabled={loading}
              className="w-[110px]"
            />
          </div>
        </div>
      </Form>
      {/* )} */}
    </Formik>
  );
};
const AddProduct = () => {
  const [isManual, setIsManual] = useState(false);
  const {
    addProduct,
    collections,
    handleImageChange,
    initialValues,
    isLoading,
    validationSchema,
  } = useAddProducts();
  const switchForms = () => {
    setIsManual(!isManual);
  };
  return (
    <div className="flex justify-center items-center">
      {isManual ? (
        <ProductForm
          switchForm={switchForms}
          validationSchema={validationSchema}
          defaultValues={initialValues}
          handleSubmit={addProduct}
          collections={collections}
          handleImageChange={handleImageChange}
          loading={isLoading}
        />
      ) : (
        <AddProductByUrl switchForm={switchForms} />
      )}
    </div>
  );
};

export default AddProduct;
