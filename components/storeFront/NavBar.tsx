import React from "react";
import { VscBellDot } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { FaStoreAlt } from "react-icons/fa";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import CopyButton from "../Click2Copy";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
const StoreNavbar = ({ open, handleSideBarToggle,data }: any) => {
  return (
    <div className="relative flex justify-between items-center py-3 lg:px-8 px-2 bg-white gap-x-6 w-full border-b">
      <div className="relative flex gap-x-1 items-center">
        <Image
          src="/logo.svg"
          alt="shoplinky"
          width="100"
          height="60"
          className="p-0 m-0"
        />
        <p className="m-0 text-[15px] text-gray-400">by {data?.store?.name}</p>
      </div>
      <div className="flex md:hidden justify-end items-center" id="hamburger">
        <div
          className={`sidebar_toggle ${open ? "open" : ""}`}
          id="sidebar_toggle"
          onClick={handleSideBarToggle}
        >
          <div className="toggle_btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            className="cross"
            style={{ position: "absolute", top: "0px", right: "0px" }}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex gap-x-6">
       {open ? <MdOutlineClose size={22} className="hover:cursor-pointer" onClick={handleSideBarToggle}/>: <CiMenuKebab size={22} className="hover:cursor-pointer" onClick={handleSideBarToggle}/>}
      </div>
      {open && (
        <div className="sidebar animate-slide-in">
          <div className="py-3 px-4">
            <div className="flex items-center gap-x-3 text-[18px] my-4 px-3">
              <IoShareSocialOutline size={24} /> Share Profile
            </div>
            <div className="flex items-center gap-x-3 text-[18px] my-4 px-3">
              <MdReportGmailerrorred size={26} /> Report Profile
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreNavbar;
