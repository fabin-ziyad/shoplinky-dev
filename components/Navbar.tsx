"use client";
import { VscBellDot } from "react-icons/vsc";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect, useRef } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useRouter } from "next-nprogress-bar";

const Navbar = ({ open, handleSideBarToggle }: any) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    // @ts-ignore
    if (menuRef.current && !menuRef.current?.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const user = useAuthStore((state) => state.user);

  return (
    <div className="relative flex justify-between items-center py-4 lg:px-8 px-6 bg-white gap-x-6 w-full">
      <div className="relative">
        <input
          type="search"
          name=""
          id=""
          placeholder="  Search here..."
          className="lg:w-[600px] lg:py-3 py-2 text-lg rounded-full bg-gray-100 lg:px-3 px-2 outline-none"
        />
      </div>
      <div className=" flex md:hidden justify-end items-center" id="hamburger">
        <div
          className={`sidebar_toggle ${open ? "open" : ""}`}
          id="sidebar_toggle"
          onClick={() => {
            handleSideBarToggle();
          }}
        >
          <div className="toggle_btn">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="cross">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="items-center gap-3 hidden md:flex">
        <div className="relative rounded-lg bg-yellow-300 px-2 py-2">
          <VscBellDot size={26} color="red" />
          <div className="dot"></div>
        </div>
        <div className="flex gap-3">
          <div className="user_pfp"></div>
          <div
            className="flex items-center p-1 gap-x-4 lg:text-sm"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div>
              <h3 className="font-bold">{user ? user?.name : "NA"}</h3>
              <p className="text-gray-400">Admin</p>
            </div>
            <MdOutlineKeyboardArrowDown size={26}  onMouseEnter={()=>setIsMenuOpen(true)}/>
          </div>
        </div>
        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-full right-[10px] w-48 bg-white border rounded shadow-lg">
            <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>router.push('/dashboard/profile')}>
              <FaUserEdit className="mr-2" />
              <span>Profile</span>
            </div>
            <div className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
              {/* <AiOutlineLogout className="mr-2" /> */}
              <span>Share Profile</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
