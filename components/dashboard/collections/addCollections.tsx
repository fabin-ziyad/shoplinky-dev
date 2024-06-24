import CustomTextArea from "@/components/input/CustomTextArea";
import CustomTextInput from "@/components/input/CustomTextField";
import { Formik, Form } from "formik";
import React from "react";
import Button from "@/components/button/Button";
import UploadImages from "@/components/input/ImageUploader";
import { useAddCollection } from "./collections.hook";

const AddCollections = () => {
  const {
    handleSubmit,
    defaultInitialValues,
    validationSchema,
    handleImageChange,
    isLoading,
  } = useAddCollection();
  const initialValues = defaultInitialValues;
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
            <UploadImages
              onChange={handleImageChange}
              initialImage={initialValues.image}
            />
            <div className="flex gap-3 mt-10 justify-end items-center">
              <Button
                label={isLoading ? "Adding..." : "Add Collection"}
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
