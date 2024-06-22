import { TbChartPieFilled } from "react-icons/tb";
import { PiCubeFocusFill } from "react-icons/pi";
import { IoIosCart } from "react-icons/io";
import { IoBagSharp, IoSettings } from "react-icons/io5";
import { LuLineChart } from "react-icons/lu";
import { AiFillMessage } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
export const hoverScale110="hover:scale-110 transition duration-500"
export const menus = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: TbChartPieFilled,
  },
  {
    id: 2,
    name: "Products",
    path: "/dashboard/products",
    icon: PiCubeFocusFill,
  },
  {
    id: 3,
    name: "Collections",
    path: "/dashboard/collections",
    icon: IoIosCart,
  },
  {
    id: 3.5,
    name: "Categories",
    path: "/dashboard/categories",
    icon: BiCategoryAlt,
  },
  {
    id: 6,
    name: "Contents",
    path: "/dashboard/contents",
    icon: AiFillMessage,
  },

  {
    id: 4,
    name: "Campaings",
    path: "/",
    icon: IoBagSharp,
  },
  {
    id: 5,
    name: "Analytics",
    path: "/",
    icon: LuLineChart,
  },
  {
    id: 7,
    name: "Settings",
    path: "/",
    icon: IoSettings,
  },
  {
    id: 8,
    name: "SignOut",
    path: "/",
    icon: FaSignOutAlt,
    style: "hover:bg-red-500 hover:text-white",
  },
];
export const TableData = [
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: true,
  },
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: true,
  },
  {
    id: 1,
    product: "fabin ziyad",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: true,
  },
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: false,
  },
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: false,
  },
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: true,
  },
  {
    id: 1,
    product: "Jane Cooper",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: false,
  },
  {
    id: 1,
    product: "Test",
    brand: "Microsoft",
    productPrice: 118,
    totalSales: 120,
    totalErnings: 80,
    isActive: true,
  },
];
