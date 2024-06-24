import React from "react";
import { logo } from "../assets";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 w-full px-4 lg:px-0 h-full">
        <div className="flex flex-col justify-start h-full">
          <div className="pt-8 lg:pt-0">
              <div className="flex items-center gap-x-8 pt-3 px-4 lg:pl-16 lg:pb-4">
                <div className="max-w-[60px]">
                  <Image src={logo} alt="logo" width={300} layout="intrinsic" />
                </div>
                <h2 className="text-4xl font-bold">Shoplinky</h2>
              </div>
          </div>
          <div className="flex-grow flex justify-center items-center">
            <div className="w-full lg:max-w-[80%] mx-auto">{children}</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image src={`https://d370e5b7u6e9y.cloudfront.net/CommonData/register2.jpg`} alt="logo" width={1000} height={500} layout="intrinsic" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
