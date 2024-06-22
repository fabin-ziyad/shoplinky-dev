"use client";

import Button from "@/components/button/Button";
import CustomTextArea from "@/components/input/CustomTextArea";
import CustomTextInput from "@/components/input/CustomTextField";
import FileComponent from "@/components/input/UploadField";
import { Formik, Form } from "formik";
import React from "react";
import { useContents, useAddContents } from "./contents.hooks";
import UploadImages from "@/components/input/ImageUploader";

const AddContent = () => {
  const {
    handleContents,
    defaultInitialValues,
    validationSchema,
    handleImageChange,
    isLoading,
    cancelAdding,
  } = useAddContents();
  return (
    <div className="lg:w-[90%] w-full">
      <div className="">
        <Formik
          initialValues={defaultInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleContents}
        >
          <Form>
            <div className="bg-[#f2f2f2] p-9 shadow-md pb-18">
              <div className="mt-3">
                <CustomTextInput
                  key={"title"}
                  name={"title"}
                  label={"Content Title"}
                  placeholder={"Enter Content Title"}
                  type={"text"}
                />
              </div>
              <div className="mt-3">
                <CustomTextInput
                  key={"type"}
                  name={"type"}
                  label={"Content Category"}
                  placeholder={"Enter Content Category (eg: tiktok)"}
                  type={"text"}
                />
              </div>
            </div>
            <div className="mt-10 bg-[#f2f2f2] p-9 shadow-md pb-18">
              <UploadImages onChange={handleImageChange} />
            </div>
            <div className="flex gap-3 mt-10 justify-end items-center">
              <Button
                label="Cancel"
                variant="close"
                type="button"
                className="w-[130px]"
                onClick={cancelAdding}
              />
              <Button
                label={isLoading ? "Creating..." : "Add Content"}
                type="submit"
                className="w-[130px]"
                disabled={isLoading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddContent;
