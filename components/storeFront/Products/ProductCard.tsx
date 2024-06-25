import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import "@/css/Product.css"; // Added ProductCard.css file
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPinterest,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { IoCopyOutline, IoShareSocialOutline } from "react-icons/io5";
import {TbShare3} from "react-icons/tb"
import { MdReport } from "react-icons/md";
import Button from "@/components/button/Button";
import Link from "next/link";
export const shareIcons = [
  {
    alt: "facebook",
    src: FaFacebook,
    link: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    alt: "linkedin",
    src: FaLinkedin,
    link: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  {
    alt: "Instagram",
    src: FaInstagram,
    link: "https://www.instagram.com/?url=",
  },
  {
    alt: "Pinterest",
    src: FaPinterest,
    link: "https://pinterest.com/pin/create/button/?url=",
  },
  {
    alt: "Telegram",
    src: FaTelegram,
    link: "https://t.me/share/url?url=",
  },
  {
    alt: "TikTok",
    src: FaTiktok,
    link: "https://www.tiktok.com/upload?url=",
  },
  {
    alt: "WhatsApp",
    src: FaWhatsapp,
    link: "https://api.whatsapp.com/send?text=",
  },
  {
    alt: "X",
    src: FaXTwitter,
    link: "https://twitter.com/share?url=",
  },
];

const ProductCard = ({ big = false, data, store }: any) => {
  const productLink = data?.link; 
  const handleBuyNowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    window.open(productLink, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className={`${big ? "min-w-[250px]" : "min-w-[150px]"
        } w-full border border-gray-100 rounded-t-md ${big ? "min-h-[260px]" : "min-h-[220px]"
        } product-card flex flex-col`}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <button className="absolute z-20 right-0 p-1 h-7 rounded-full">
            <Drawer>
              <DrawerTrigger asChild>
                <TbShare3 size={17} />
              </DrawerTrigger>
              <DrawerContent className="lg:w-[60%] md:w-[70%] w-full bg-white">
                <div className="w-full">
                  <DrawerHeader>
                    <DrawerTitle>Share this Product</DrawerTitle>
                    <DrawerDescription>
                      {data?.name} by {store}
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className=" p-3 flex flex-col ">
                    <div className="grid grid-cols-5 gap-5 my-5 px-3 items-center">
                      {shareIcons.map((icon) => (
                        <Link
                          key={icon.alt}
                          href={`${icon.link}${process.env.NEXT_PUBLIC_URL}/${store}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <icon.src size={22} />
                        </Link>
                      ))}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex text-sm my-2">
                      <IoCopyOutline size={24} />
                      <p className="ml-5 text-gray-300">
                        {`Product link ( shoplin.ky/${store}/product/${data?.slug} ) [DISABLED]`}
                      </p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex text-sm my-2">
                      <MdReport size={24} />
                      <p className="ml-5">Report This Product</p>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </button>
        </div>
      </CardHeader>
      <div className="bg-white rounded-t-lg shadow-lg overflow-hidden flex flex-col product-card-content">
        <div className="flex justify-center w-full bg-gray-100 rounded-b-md">
          <div className="relative w-full pb-[100%]"> {/* Creates a square container */}
            <Image
              src={data?.image}
              alt={data?.name || 'Product Image'}
              layout="fill" // Ensures the image covers the container
              objectFit="cover" // Ensures the image fits the container
              className="absolute inset-0 w-full h-full" // Covers the container fully
            />
          </div>
        </div>
        <div className="py-1 px-2 flex-1 flex flex-col justify-between">
          <h2 className="text-[15px] font-semibold text-gray-700">{data?.name}</h2>
          <p className="text-gray-600 truncate-text text-[13px] product-description">
            {" "}
            {data?.description}
          </p>
          <p className="text-gray-600 text-[15px] font-semibold m-0">
            {" "}
            ₹{data?.price}
          </p>
        </div>
      </div>
      <button
        onClick={handleBuyNowClick}
        className="bg-orange-500 hover:font-bold hover:translate-y-[0px] text-white w-full p-2 rounded-b-md rounded-t-none"
      >
        Buy Now
      </button>
    </Card>
  );
};

export default ProductCard;



