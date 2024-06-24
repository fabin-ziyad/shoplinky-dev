// "use client";
import Button from "@/components/button/Button";
import CustomTextInput from "@/components/input/CustomTextField";
import UploadImages from "@/components/input/ImageUploader";
import Loader from "@/components/ui/Loader";
import { Formik, Form } from "formik";
import { useUpdateContent } from "./contents.hooks";

const EditContent = ({
  id,
  handleUpdateContent,
  content,
  validationSchema,
  handleImageChange,
  initialValues,
  handlecancel,
  loading,
}: any) => {
  if (!content) {
    return <Loader />;
    }
  return (
    <div className="lg:w-[90%] w-full">
      <div className="">
        <Formik
          {...{ initialValues, validationSchema }}
          onSubmit={(values) => handleUpdateContent(id,values)}
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
              <UploadImages
                onChange={handleImageChange}
                initialImage={initialValues.image}
              />
            </div>
            <div className="flex gap-3 mt-10 justify-end items-center">
              <Button
                label="Cancel"
                variant="close"
                type="button"
                className="w-[130px]"
                onClick={handlecancel}
              />
              <Button
                label={loading ? "Updating..." : "Update Content"}
                type="submit"
                className="w-[150px]"
                // disabled={loading}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditContent;
