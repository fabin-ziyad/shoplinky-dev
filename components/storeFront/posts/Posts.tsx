import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { truncateText } from "@/utils/common";
import { useStorePosts } from "./posts.hooks";
import { PostCardProps } from "./posts.hooks";
import PostSkeleton from "./postSkeleton";
import NoPostsFound from "./NotFound";
import Link from "next/link";
import { getStoreName } from "@/utils/common";
import { usePathname } from "next/navigation";


const PostCard = ({ image, title, slug }: PostCardProps) => {
  const path = usePathname();
  const store = getStoreName(path);
  return (
    <Link href={`/${store}/content/${slug}`}>
      <div className="p-1 md:p-2 relative min-w-[150px] w-full cursor-pointer">
        <div className="w-full relative">
          <AspectRatio ratio={176 / 215}>
            <Image
              src={image || "/images/post-1.png"}
              alt={title}
              className="object-cover rounded-md"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-gray-900 to-transparent rounded-b-sm" />
          </AspectRatio>
        </div>
        <div className="absolute text-lg bottom-2 lg:bottom-8 left-3 flex w-[90%] items-center justify-between">
          <p className="pl-1 transform text-white hidden lg:block md:block text-lg">
            {truncateText(title, 35)}
          </p>
          <p className="pl-1 transform text-white lg:hidden text-lg">
            {truncateText(title, 16)}
          </p>
        </div>
      </div>
    </Link>
  );
};


const Posts = ({posts,loading}:any) => {
  // const { posts, loading } = useStorePosts();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 mt-4 bg-white">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 mt-4 bg-white">
      {posts?.length ? (
        posts.map((post: PostCardProps, index: number) => (
          <PostCard key={index} {...post} />
        ))
      ) : (
        <div className="col-span-12 my-12">
          <NoPostsFound />
        </div>
      )}
    </div>
  );
};

export default Posts;
