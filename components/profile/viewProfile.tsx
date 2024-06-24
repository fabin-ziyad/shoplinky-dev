import React from "react";
import { BsBuildings } from "react-icons/bs";
import Button from "../button/Button";
import { FiInstagram } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiTwitterXLine } from "react-icons/ri";
import Image from "next/image";
const ViewProfile = ({ handle, data }: any) => {
  return (
    <div className="bg-white px-[24px] py-4 rounded-md w-full ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <BsBuildings size={35} />
          <div>
            <h2 className="text-medium font-semibold">Your Profile Details</h2>
          </div>
        </div>
        <Button label="Edit Profile" onClick={handle} />
      </div>
      <hr className="my-5" />
      <div className="flex gap-7 flex-col md:flex-row">
        <div className="text-center flex flex-col justify-center items-center">
          <div className="w-[100px] h-[100px]">
            <Image
              src={
                data?.image ||
                "https://pyxis.nymag.com/v1/imgs/56a/6db/88a5a37a862d2b4039e2902909a554ddf3.rsquare.w600.jpg"
              }
              alt="profile"
              fill
              className="rounded-full hover:cursor-pointer hover:scale-110 transition duration-500"
            />
          </div>
          <h4 className="font-bold mt-3">{data?.name || "NA"}</h4>
          <h4 className="font-bold mt-1 text-gray-500">
            @shoplinky/{data?.store?.name || "NA"}
          </h4>
        </div>
        <div>
          <div className="my-4 grid grid-cols-7 gap-3">
            <p className="font-semibold text-gray-500 col-span-2">Username</p>
            <p className="font-semibold col-span-5">
              @shoplinky/{data?.store?.name || "NA"}
            </p>
          </div>
          <div className="my-4 grid grid-cols-7 gap-3">
            <p className="font-semibold text-gray-500 col-span-2">Name</p>
            <p className="font-semibold col-span-5">{data?.name || "NA"}</p>
          </div>
          <div className="my-4 grid grid-cols-7 gap-3">
            <p className="font-semibold text-gray-500 col-span-2">Bio</p>
            <p className="font-regular col-span-5">{data?.bio || "NA"}</p>
          </div>
        </div>
      </div>
      <hr className="mt-3" />

      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">Gender</p>
        <p className="font-semibold col-span-5">{data?.gender || "NA"}</p>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">Country</p>
        <p className="font-semibold col-span-5">India</p>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">
          Intrested Fields
        </p>
        <div className="flex col-span-5 gap-2">
          <div>
            <div className="tag rounded-lg bg-blue-100 px-2 text-gray-600">
              Fashion
            </div>
          </div>
          <div>
            <div className="tag rounded-lg bg-blue-100 px-2 text-gray-600">
              Beauty
            </div>
          </div>
          <div>
            <div className="tag rounded-lg bg-blue-100 px-2 text-gray-600">
              Travel
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">Instagram</p>
        <a
          href="https://www.instagram.com/"
          target="blank"
          className="hover:text-blue-500 hover:scale-[1.01]"
        >
          <p className="font-semibold col-span-5">NA</p>
        </a>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">Tiktok</p>
        <a
          href="https://www.instagram.com/"
          target="blank"
          className="hover:text-blue-500 hover:scale-[1.01]"
        >
          <p className="font-semibold col-span-5">NA</p>
        </a>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">Youtube</p>
        <a
          href="https://www.instagram.com/"
          target="blank"
          className="hover:text-blue-500 hover:scale-[1.01]"
        >
          <p className="font-semibold col-span-5">NA</p>
        </a>
      </div>
      <div className="my-4 grid grid-cols-7 gap-3">
        <p className="font-semibold text-gray-500 col-span-2">X</p>
        <a
          href="https://www.instagram.com/"
          target="blank"
          className="hover:text-blue-500 hover:scale-[1.01]"
        >
          <p className="font-semibold col-span-5">NA</p>
        </a>
      </div>
    </div>
  );
};

export default ViewProfile;
