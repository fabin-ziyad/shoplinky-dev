import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { convertToFirstLetterUppercase } from "@/utils/common";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
export default function Footer({ data }: any) {
  const MySocialProfiles = [
    {
      src: FaFacebook,
      link: "",
    },
    {
      src: FaLinkedin,
      link: "",
    },
    {
      src: FaInstagram,
      link: "",
    },
    {
      src: FaTiktok,
      link: "",
    },
    {
      src: FaYoutube,
      link: "",
    },
  ];
  return (
    <footer className="relative bg-white py-2 px-1 md:p-4 z-50 w-full">
      <div className="flex flex-col items-center">
        <div className="max-w-[100px] w-full mt-8">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/images/profile.png"
              alt="Image"
              className="rounded-full object-cover"
              fill={true}
            />
          </AspectRatio>
        </div>
        <h2 className="mt-4 text-lg font-semibold">
          {convertToFirstLetterUppercase(data?.name) || "NA"}
        </h2>
        <p className="text-sm text-gray-600">Follow me on social media</p>
        <div className="flex mt-4 space-x-7">
          {MySocialProfiles.map((profile,index) => (
            <profile.src size={30} className="hover:cursor-pointer transition duration-500 ease-in-out transform hover:translate-y-[-4px]" key={index} />
          ))}
        </div>
      </div>
      <div className="mt-6 bg-black text-white p-6 rounded-lg">
        <div className="flex flex-col items-center">
          <Link
            className="text-white text-lg font-semibold block mb-3"
            href="/register"
          >
            Create your ShopLinky profile
          </Link>
          <div className="border-t border-white w-full py-3">
            <Link className="text-white block mb-3" href="#">
              Terms & conditions
            </Link>
            <Link className="text-white block mb-3" href="#">
              Privacy policy
            </Link>
            <Link className="text-white" href="#">
              Help
            </Link>
          </div>
        </div>
      </div>
      <div className=" py-10 flex flex-col items-center">
        <Image src="/logo.svg" alt="shoplinky" width="100" height="30" />
        <p className="text-md text-gray-800">All rights reserved</p>
      </div>
    </footer>
  );
}
