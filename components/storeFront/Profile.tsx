import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { convertToFirstLetterUppercase } from "@/utils/common";

const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 max-w-xl m-auto p-3">
      <div className="max-w-[100px] w-full">
        <AspectRatio ratio={1 / 1}>
          <div className="rounded-full bg-gray-200 animate-pulse"></div>
        </AspectRatio>
      </div>
      <div className="mt-4 text-center">
        <h1 className="md:text-3xl text-2xl font-semibold text-gray-200 animate-pulse">
          &#8230;
        </h1>
        <p className="text-gray-400 text-lg max-w-sm animate-pulse">
          &#8230; &#8230; &#8230;
        </p>
      </div>
    </div>
  );
};
function ProfileCard({ data, loading }: any) {
  if (loading) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-5 max-w-xl m-auto p-3">
      <div className="max-w-[100px] w-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src="/images/profile.png"
            alt="Image"
            className="rounded-full object-cover"
            fill={true}
          />
        </AspectRatio>
      </div>
      <div className="mt-4 text-center">
        <h1 className="md:text-3xl text-2xl font-semibold ">
          {convertToFirstLetterUppercase(data?.name) || "NA"}
        </h1>
        <p className="text-gray-500 text-lg max-w-sm ">
          Talks about #fashion, #youtube, #socialmedia, and #lifestyle
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
