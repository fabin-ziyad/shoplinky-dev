import React from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { LuUserCheck2 } from "react-icons/lu";
import { MdOutlineViewInAr } from "react-icons/md";
const Overview = ({ currentItems }: any) => {
  // const NewUser = process.env.WELCOME_MESSAGE === "yes";
  const NewUser = false;

  return (
    <div>
      {!NewUser ? (
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-white shadow-lg rounded-lg lg:py-6 py-4 lg:px-8 lg:gap-2 gap-8">
          <div className="flex items-center gap-x-6 justify-center lg:border-r">
            <div className="bg-green-100 px-2 py-2 rounded-full text-green-600">
              <HiOutlineUsers size={80} />
            </div>
            <div>
              <h2 className="text-lg">Total Customers</h2>
              <h2 className="font-bold text-4xl">5,423</h2>
              <h2 className="text-md py-2">16% up</h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 lg:pl-6 lg:border-r">
            <div className="bg-green-100 px-2 py-2 rounded-full text-green-600">
              <LuUserCheck2 size={80} />
            </div>
            <div>
              <h2 className="text-lg">Total Customers</h2>
              <h2 className="font-bold text-4xl">5,423</h2>
              <h2 className="text-md py-2">16% up</h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-6 lg:pl-6">
            <div className="bg-green-100 px-3 py-3 rounded-full text-green-600">
              <MdOutlineViewInAr size={70} />
            </div>
            <div>
              <h2 className="text-lg">Total Customers</h2>
              <h2 className="font-bold text-4xl">5,423</h2>
              <h2 className="text-md py-2">16% up</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full lg:py-2 py-4 lg:px-2">
          <h2 className="lg:text-3xl font-semibold">
            Hi User,Welcome to the shoplinky
          </h2>
          <h4>Unlock the power of affliate Shopping</h4>
        </div>
      )}
    </div>
  );
};

export default Overview;
