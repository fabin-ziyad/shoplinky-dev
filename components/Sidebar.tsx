// import logo from "../../assets/images/logo.svg";
import { handleLogout } from "@/hooks/Firebase/authentications";
import { menus } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
interface Prop {
  open: boolean;
  currentPath: string;
}
// Assuming you import Tailwind CSS classes
export const Sidebar = ({ open, currentPath }: Prop) => {
  return (
    <div
      className={`h-screen ${
        open ? "w-[65%] fixed top-0 left-0 z-40 shadow-custom" : ""
      }  bg-white transition duration-300 ease-in-out`}
    >
      <div className="flex gap-3 items-center justify-between p-4">
        <div className="flex gap-3 items-center">
          <div className="w-[55px] h-[50px] flex justify-center items-center rounded-lg bg-[#5d60ef]">
            {/* Logo here */}
          </div>
          <h1 className="font-bold lg:text-2xl">Shoplinky</h1>
        </div>
      </div>
      <div className="flex flex-col  overflow-y-auto h-full">
        <ul className="px-4">
          {menus.map((menu) => (
            <li
              className={`lg:my-3 md:my-3 my-6 py-2 pl-4 text-[#767676] w-[170px] rounded-lg transition duration-600 hover:shadow-lg ${
                menu.id == 8 ? "hover:bg-red-500" : "hover:bg-blue-500"
              } hover:text-white ${
                currentPath === menu.path ? "bg-blue-500 text-white" : ""
              }`}
              key={menu.id}
              onClick={menu.id == 8 ? handleLogout : () => {}}
            >
              <Link
                href={menu.path}
                className="flex items-center gap-4 text-md"
              >
                <menu.icon size={23} />
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
