// Register.tsx
"use client";
import React, { useState } from "react";
import TextField from "../input/TextField";
import Button from "../button/Button";
import AuthLayout from "../layouts/AuthLayout"; // Adjust the path as necessary
import Image from "next/image";
import { logo } from "../assets";
import { useRouter } from "next/navigation";
import { Form, Formik, FormikHelpers } from "formik";
import { useRegister } from "./auth.hooks";
import { BsStars } from "react-icons/bs";
import { FaFacebook, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import ButtonWithIcon from "../button/ButtonWithIcon";

const Register: React.FC = () => {
  const router = useRouter();
  const { checkDomainExists, handleRegister, step, domain } = useRegister();
  const initialValues = { domain: "", name: "", email: "" };

  return (
    <AuthLayout>
      {step === 1 ? (
        <StepOne
          initialValues={{ domain: initialValues.domain }}
          checkDomainExists={checkDomainExists}
          router={router}
        />
      ) : (
        <StepTwo
          handleRegister={handleRegister}
          initialValues={initialValues}
          domain={domain}
        />
      )}
    </AuthLayout>
  );
};

interface StepOneProps {
  initialValues: { domain: string };
  checkDomainExists: (values: { domain: string }) => Promise<void>;
  router: any;
}

const StepOne: React.FC<StepOneProps> = ({
  initialValues,
  checkDomainExists,
  router,
}) => {
  return (
    <div className="w-full max-w-md p-4 flex flex-col justify-center items-center">
      <div className="w-full">
        <h2 className="font-semibold text-3xl pt-2 whitespace-nowrap">
          Claim your unique shop name
        </h2>
        <p className="text-gray-400 text-xl mb-8">
          Make Your Mark With Shoplinky
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={(
            values: { domain: string },
            actions: FormikHelpers<{ domain: string }>
          ) => {
            checkDomainExists(values).finally(() => {
              actions.setSubmitting(false);
            });
          }}
        >
          <Form>
            <TextField
              type="text"
              name="domain"
              inputClass="outline-none text-gray-500"
              prefix="shoplin.ky"
            />
            <Button
              type="submit"
              label="Grab Your Store Name"
              variant="custom"
              className="bg-blue-500 text-white px-4 rounded-lg text-lg lg:text-xl w-full py-2 mt-4"
            />
          </Form>
        </Formik>
      </div>
      <p className="mt-6 text-lg lg:text-xl font-medium text-gray-400">
        or{" "}
        <span
          className="hover:cursor-pointer text-blue-500"
          onClick={() => router.push("/login")}
        >
          {" "}
          Login
        </span>
      </p>
    </div>
  );
};

const StepTwo = ({ handleRegister, initialValues, domain }: any) => {
  return (
    <div className="w-full lg:max-w-[90%] bg-white shadow-xl rounded-xl">
      <div className="px-5 py-3">
        <h2 className="font-semibold text-center text-lg pt-2">
          Sign Up for Your Store
        </h2>
        <p className="text-gray-400 text-center text-md mb-8">
          Complete the form to create your account
        </p>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleRegister({ ...values, domain })}
        >
          <Form>
            <TextField
              name="name"
              type="text"
              placeholder="Enter your name"
              className="py-3"
              inputClass="pl-3"
            />
            <TextField
              name="email"
              type="email"
              placeholder="Enter your email"
              className="py-3"
              inputClass="pl-3"
            />
            <TextField
              name="password"
              type="password"
              placeholder="Enter your Password"
              className="py-3"
              inputClass="pl-3"
            />
            <Button
              type="submit"
              label="Sign Up"
              variant="custom"
              className="bg-blue-600 hover:bg-blue-800 text-white w-full px-4 py-2 rounded-lg my-3"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default Register;
