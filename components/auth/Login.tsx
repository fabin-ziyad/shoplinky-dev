import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import AuthLayout from "../layouts/AuthLayout";
import { BsStars } from "react-icons/bs";
import TextField from "../input/TextField";
import Button from "../button/Button";
import ButtonWithIcon from "../button/ButtonWithIcon";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLogin } from "./auth.hooks";

const Login = () => {
  const {
    handleSignIn,
    isLogged,
    isLoading,
    router,
    initialValues,
    appleSignIn,
    facebookSignIn,
    googleSignIn,
    goToRegister,
    manualSignIn
  } = useLogin();

  return (
    <AuthLayout>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          {/* <div className="spinner">Loading...</div> */}
        </div>
      )}

      <div className="w-full lg:max-w-[90%] bg-white shadow-xl rounded-xl">
        <div className="px-5 py-3">
          <div className="flex justify-center py-2">
            <BsStars size={50} className="border-2 px-2 rounded-md" />
          </div>
          <h2 className="font-semibold text-center text-lg pt-2">
            Login to your account
          </h2>
          <p className="text-gray-400 text-center text-md mb-8">
            One step closer to your online store
          </p>
          <Formik initialValues={initialValues} onSubmit={handleSignIn}>
            <Form>
              <TextField
                name="email"
                type="text"
                placeholder="Enter your email"
                className="py-3"
                inputClass="pl-3"
              />
              <TextField
                name="password"
                type="password"
                className="py-3"
                placeholder="Enter your password"
                inputClass="pl-3"
              />
              <Button
                type="submit"
                label={isLoading ? "Creating..." : "Get Started"}
                variant="custom"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-800 text-white w-full px-4 py-2 rounded-lg my-3"
              />
            </Form>
          </Formik>
          <h4>Dont have an account ? <span className="underline font-semibold hover:cursor-pointer" onClick={goToRegister}>Register</span></h4>
          <h2 className="pt-2 text-center">OR</h2>
          <ButtonWithIcon
            icon={FcGoogle}
            label="Sign In With Google"
            onClick={googleSignIn}
          />
          <ButtonWithIcon
            icon={FaFacebook}
            label="Sign In Facebook"
            onClick={facebookSignIn}
          />
          <ButtonWithIcon
            icon={FaApple}
            label="Sign In With Apple"
            onClick={appleSignIn}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
