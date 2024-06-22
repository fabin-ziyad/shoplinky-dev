import CustomTextArea from "@/components/input/CustomTextArea";
import CustomTextInput from "@/components/input/CustomTextField";
import FileComponent from "@/components/input/UploadField";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import { hasErrors } from "@/utils/common";
import UploadImages from "@/components/input/ImageUploader";
import { useAddCollection,useUpdateCollection } from "./collections.hook";

const AddCollections = ({ data, isEdit }: any) => {
  const isEditMode = isEdit;
  const {
    handleSubmit,
    defaultInitialValues,
    validationSchema,
    handleImageChange,
    isLoading,
  } = isEditMode ? useUpdateCollection(data) : useAddCollection();
  const initialValues = isEditMode
    ? { ...defaultInitialValues, ...data }
    : defaultInitialValues;
  return (
    <div className="lg:w-[90%] w-full">
      <div className=" ">
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="bg-[#f2f2f2] p-9 shadow-md pb-18">
              <div className="mt-3">
                <CustomTextInput
                  key={"name"}
                  name={"name"}
                  label={"Collection Name"}
                  placeholder={"Enter Collection Name"}
                  type={"text"}
                />
              </div>
              <div className="mt-3">
                <CustomTextArea
                  key={"description"}
                  name={"description"}
                  label={"Description"}
                  cols={10}
                  rows={5}
                  placeholder={"Add Description"}
                  type={"text"}
                />
              </div>
            </div>
            {/* <div className="mt-10 bg-[#f2f2f2] p-9 shadow-md pb-18">
              <FileComponent label="Collection Image" name="image" />
            </div> */}
            <UploadImages onChange={handleImageChange} initialImage={initialValues.image} />
            <div className="flex gap-3 mt-10 justify-end items-center">
              <Button
                label={
                  isEditMode
                    ? isLoading
                      ? "Updating..."
                      : "Update Collection"
                    : isLoading
                    ? "Creating..."
                    : "Add Collection"
                }
                className="w-[160px]"
                type="submit"
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCollections;
