/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCollection } from "./collection.hooks";
import { getStoreName, truncateText } from "@/utils/common";

export const CollectionCard = ({ collection }: any) => {
  const path = usePathname();
  const store = getStoreName(path);
  return (
    <div className="flex w-full lg:max-h-60 max-h-[122px] rounded-lg border-2 bg-white border-gray-100">
      <img
        alt="Holiday Collection"
        className="aspect-square lg:h-[210px] h-[120px] lg:max-w-[30%] rounded-md"
        src={collection.image || "/images/post-1.png"}
      />
      <div className="flex flex-col justify-between px-4 py-1">
        <div>
          <h2 className="text-medium font-semibold">
            {collection.name || "NA"}
          </h2>
          <p className="whitespace-normal lg:block md:block hidden text-sm text-gray-600">
            {collection.description || ""}
          </p>
          <p className="whitespace-normal lg:hidden md:hidden block text-sm text-gray-600">
            {truncateText(collection.description,30) || ""}
          </p>
          <p className="text-sm md:text-lg text-gray-600 mt-3">
            {collection.products.length || 0} Products
          </p>
        </div>
        <Link
          className="text-orange-600"
          href={`/${store}/collections/${collection.slug}`}
        >
          Explore →
        </Link>
      </div>
    </div>
  );
};

export const CollectionCardSmall = ({
  src,
  text,
  desc,
  url,
}: {
  src: string;
  text: string;
  desc: string;
  url: string;
}) => {
  return (
    <div className="p-1 md:p-2 relative min-w-[180px] max-w-[300px]  rounded-md">
      <Link href={url || "/fabin/collections"}>
        <div className="w-full relative">
          <AspectRatio ratio={7 / 12}>
            <Image
              src={src || "/images/post-1.png"}
              alt="Image"
              className="object-cover rounded-md"
              fill={true}
              priority={true}
            />
          </AspectRatio>
          <div className="absolute bottom-0 w-full h-3/6 bg-gradient-to-t from-gray-900 to-transparent rounded-md"></div>
        </div>
      </Link>
      <p className="absolute pl-1 text-sm md:text-sm font-semibold bottom-12 left-3 max-w-[95%] transform text-white">
        {truncateText(text,24)}
      </p>
      <p className="absolute pl-1 text-xs md:text-sm bottom-3 left-3 max-w-[70%] text-gray-300 transform ">
        {desc}
      </p>
    </div>
  );
};
