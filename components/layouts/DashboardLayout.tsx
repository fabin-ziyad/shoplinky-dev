"use client";
import React from "react";
import { Sidebar } from "../Sidebar";
import { useState } from "react";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import AuthWrapper from "../middlewares/authMiddleware";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const handleSideBarToggle = () => {
    setOpen(!open);
  };

  return (
    <AuthWrapper>
      <div
        className={`fixed top-0 left-0 h-full z-40 w-[210px] ${
          open ? "block" : "hidden md:block"
        }`}
      >
        <Sidebar open={open} currentPath={path} />
      </div>

      <div className={`flex flex-col md:pl-[210px] min-h-screen w-full`}>
        <div className="z-10">
          <Navbar open={open} handleSideBarToggle={handleSideBarToggle} />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 py-3 lg:px-[33px] md:px-4 px-2 lg:mt-0  ">
          <BreadCrumbs />
          <div className="lg:mt-5 lg:px-6 lg:py-5">{children}</div>
        </div>
      </div>
    </AuthWrapper>
  );
};
export default DashboardLayout;
