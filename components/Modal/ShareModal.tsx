import React from "react";
import { CardHeader } from "../ui/card";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { Separator } from "@radix-ui/react-separator";
import { shareIcons } from "../storeFront/Products/ProductCard";
import { usePathname } from "next/navigation";
import { getStoreName } from "@/utils/common";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdReport } from "react-icons/md";

const ShareModal = ({ subtitle }: any) => {
  const path = usePathname();
  const store = getStoreName(path);
  return (
    <CardHeader className="p-0">
      <div className="relative">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="absolute z-50 top-[-15px] right-3 px-1 h-7 w-7 rounded-full flex items-center justify-center">
              <BsThreeDotsVertical size={24} />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>Share this Product</DrawerTitle>
                <DrawerDescription>
                  {subtitle} by {store}
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-3 flex flex-col">
                <div className="grid grid-cols-5 gap-5 my-5">
                  {shareIcons.map((icon) => (
                    <a
                      key={icon.alt}
                      // href={`${icon.link}http://localhost:3000/${store}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <icon.src size={24} />
                    </a>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex text-sm my-2">
                  <IoCopyOutline size={23} />
                  <p className="ml-5">Product link (shoplin.ky/Keriasn)</p>
                </div>
                <Separator className="my-2" />
                <div className="flex text-sm my-2">
                  <MdReport size={23} />
                  <p className="ml-5">Report This Product</p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </CardHeader>
  );
};

export default ShareModal;
