import Button from "@/components/button/Button";
import CustomTextInput from "@/components/input/CustomTextField";
import SelectField from "@/components/input/CustomSelect";
import { Formik, Form } from "formik";
import React from "react";
const AddCategory = ({ addCategory, initialValues, schema, loading }: any) => {
  return (
    <div className="lg:w-[90%] w-full">
      <div className=" ">
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={addCategory}
        >
          <Form>
            <div className="bg-[#f2f2f2] p-9 shadow-md pb-18">
              <div className="mt-3">
                <CustomTextInput
                  key={"name"}
                  name={"name"}
                  label={"Category Name"}
                  placeholder={"Enter Category Name"}
                  type={"text"}
                />
              </div>
              <div className="mt-3">
                <SelectField
                  label="Category Type"
                  name="type"
                  options={[
                    { value: "", label: "Select Type" },
                    { value: "Content", label: "Content" },
                    { value: "Product", label: "Product" },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-10 justify-end items-center">
              <Button
                type="submit"
                label={loading ? "Adding..." : "Add Content"}
                className="w-[130px]"
                disabled={loading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddCategory;
