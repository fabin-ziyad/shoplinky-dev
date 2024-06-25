"use client";
import React from "react";
import StoreNavbar from "../storeFront/NavBar";
import Footer from "../storeFront/Footer";
import { ArrowLeftIcon } from "lucide-react";
import ShareModal from "../Modal/ShareModal";
import { usePathname } from "next/navigation";
import { getStoreName, goBack } from "@/utils/common";

const StoreLayout = ({
  children,
  switchNavbar,
  open,
  toggleSideBar,
  storeData,
}: any) => {
  const path = usePathname();
  const store = getStoreName(path);

  return (
    <div className="w-full flex justify-center">
      {/* Reduce the maximum width for all breakpoints */}
      <div className="xl:w-[60%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-full">
        <div className="flex flex-col w-full bg-white items-center">
          {switchNavbar ? (
            <div className="w-full bg-white shadow">
              <div className="w-full flex items-center justify-between py-2 px-4 border-b border-gray-200">
                <div className="flex items-center gap-x-2 w-full justify-start md:justify-between">
                  {/* Make the arrow mark slightly bigger for large screens */}
                  <ArrowLeftIcon
                    className="text-gray-600 cursor-pointer"
                    size={20}
                    onClick={goBack}
                  />
                  <div className="flex items-center gap-x-2 md:gap-x-4">
                    {/* Responsive size for the profile picture */}
                    <img
                      src="/images/post-1.png"
                      alt=""
                      className="w-[30px] h-[30px] rounded-full"
                    />
                    {/* Responsive font size for the profile name */}
                    <h1 className="text-lg md:text-xl font-semibold p-0 m-0">
                      {store}
                    </h1>
                  </div>
                  <div className="hidden md:block">
                    <ShareModal subtitle={"Shoplinky store"} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <StoreNavbar
              open={open}
              handleSideBarToggle={toggleSideBar}
              data={storeData}
            />
          )}
          {/* Ensure consistent padding and margin */}
          <div className="w-full px-4 pt-4">
            {children}
          </div>
          <Footer data={storeData} />
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
