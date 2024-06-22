import { Form, Formik } from "formik";
import React from "react";
import { addProductByLink } from "./product.hook";
import CustomTextInput from "../../input/CustomTextField";
import Button from "@/components/button/Button";

const AddProductByUrl = ({ switchForm }: any) => {
  const { initialValues, validationSchema, handleSubmit } = addProductByLink();
  return (
    <div className="lg:w-[90%] w-full">
      <div className="bg-[#f2f2f2] py-8 px-[24px] shadow-md pb-18">
        <h2 className="font-bold text-xl mb-5">Add New Product</h2>
        <p className="font-semibold mb-1">Add Product Link</p>
        <p className="text-xs mb-3">
          Add product link to feature details for you
        </p>
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={(values) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          <Form>
            <CustomTextInput
              key={"link"}
              name={"link"}
              placeholder={"xyz.myebay.com"}
              type={"text"}
            />
            <Button
              label="Find Product"
              type="submit"
              className="my-3 mt-5 w-[140px]"
            />
          </Form>
        </Formik>
        <p className="mb-5 text-gray-500 text-sm font-bold">or</p>
        <Button
          label="Add Products Manually"
          onClick={switchForm}
          className="w-[200px]"
        />
      </div>
    </div>
  );
};

export default AddProductByUrl;
