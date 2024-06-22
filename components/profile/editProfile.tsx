"use client";
import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { RiTwitterXLine } from "react-icons/ri";
import Button from "../button/Button";
import FileComponent from "../input/UploadField";
import { Formik, Form } from "formik";
import CustomTextArea from "../input/CustomTextArea";
import CustomTextInput from "../input/CustomTextField";
import { useEditProfile } from "./profile.hooks";
import TextField from "../input/TextField";
import SelectField from "../input/CustomSelect";
import TagsInput from "../input/TagsInput";
import UploadImages from "../input/ImageUploader";
import { toast } from "react-toastify";

const EditProfile = ({handle, handleSubmit, initialValues, validationSchema, handleImageChange }: any) => {
  console.log(initialValues);
  const Gender = [
    { value: "", label: "Select your Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];
  const Country = [
    { value: "", label: "Select your Country" },
    { value: "India", label: "India" },
    { value: "US", label: "US" },
    { value: "UAE", label: "UAE" },
  ];
  const handleTest = () => {
    toast.warning("Sorry currently this feature is under development, will be released soon")
  }
  return (
    <div className="bg-white lg:px-[24px] px-[8px]  py-4 my-3 rounded-md lg:w-[70%] w-full ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <BsBuildings size={35} />
          <div>
            <h2 className="text-medium font-semibold">
              Edit Your Profile Details
            </h2>
            <p className="hidden lg:block text-sm font-light">
              Please add required fields to standout your profile
            </p>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <Formik
        {...{ initialValues, validationSchema }}
        onSubmit={(values) => {
          console.log(values);
          // handleSubmit(values);
        }}
      >
        <Form>
          <div className="pb-18">
            <div className="">
              <UploadImages onChange={handleImageChange} />
            </div>
            <hr className="my-3" />
            <div className="my-4">
              <TextField
                prefix={"shoplinky"}
                className="bg-white flex w-full items-center justify-center"
                key={"username"}
                label={"User Name*"}
                name={"username"}
                placeholder={"username"}
                type={"text"}
                disabled
              />
            </div>
            <div className="my-4">
              <CustomTextInput
                key={"name"}
                name={"name"}
                label={"Name*"}
                placeholder={"Your Name"}
                className="bg-white"
                type={"text"}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <CustomTextArea
                key={"bio"}
                className="bg-white"
                name={"bio"}
                rows={4}
                cols={10}
                label={"Bio*"}
                placeholder={"About you"}
                type={"text"}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <SelectField
                label="Gender*"
                name="gender"
                options={Gender}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <SelectField
                label="Country*"
                name="country"
                options={Country}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <TagsInput name="interests" label="Interests" />
            </div>
            <hr />
            <h4 className="font-bold my-4">Additional Info</h4>
            <div className="my-4">
              <CustomTextInput
                key={"instagram"}
                name={"instagram"}
                label={"Instagram"}
                placeholder={"Instagram Username"}
                className="bg-white"
                type={"text"}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <CustomTextInput
                key={"tiktok"}
                name={"tiktok"}
                label={"Tiktok"}
                placeholder={"Tiktok Username"}
                className="bg-white"
                type={"text"}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <CustomTextInput
                key={"youtube"}
                name={"youtube"}
                label={"Youtube"}
                placeholder={"Youtube Username"}
                className="bg-white"
                type={"text"}
                align="horizontal"
              />
            </div>
            <div className="my-4">
              <CustomTextInput
                key={"x"}
                name={"x"}
                label={"X"}
                placeholder={"X Username"}
                className="bg-white"
                type={"text"}
                align="horizontal"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-10 justify-end items-center">
            <Button
              label="Cancel"
              variant="close"
              className="w-[110px]"
              onClick={handle}
            />
            <Button label="Update Profile" type="button" className="w-[160px]" onClick={handleTest}/>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProfile;
