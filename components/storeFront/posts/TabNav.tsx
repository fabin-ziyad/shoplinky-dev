"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CollectionCardSmall } from "../collection/CollectionCards";
import Posts from "@/components/storeFront/posts/Posts";
import ProductsList from "@/components/storeFront/Products/Products";
import { usePathname } from "next/navigation";
import { useCollectionsData } from "../collection/collection.hooks";
import { getStoreName } from "@/utils/common";
import Link from "next/link";
import CollectionCardSkeleton from "../collection/CollectionCardSkeleton";
import { FaArrowRightLong } from "react-icons/fa6";
import { useStorePosts } from "./posts.hooks";
import { useStoreProducts } from "../Products/product.hook";
export default function TabNav() {
  const path = usePathname();
  const [tab, setTab] = React.useState("posts");
  const store = getStoreName(path);
  const { collections, loading, error } = useCollectionsData();
  const { posts, postsLoading } = useStorePosts();
  const { products, productsLoading } = useStoreProducts();

  return (
    <Tabs
      defaultValue="posts"
      onValueChange={(value) => {
        setTab(value);
        console.log("value", value);
      }}
      className="bg-white"
    >
      <TabsList className="w-full flex justify-center gap-5 bg-white cursor-pointer">
        <TabsTrigger asChild value="posts">
          <a className="flex flex-col items-center text-black">
            <p className="text-lg">Posts</p>
            {tab === "posts" && (
              <div className="h-1 w-[52px] bg-black rounded-full" />
            )}
          </a>
        </TabsTrigger>
        <TabsTrigger asChild value="products">
          <a className="flex flex-col items-center text-black">
            <p className="text-lg">Products</p>
            {tab === "products" && (
              <div className="h-1 w-[78px] bg-black rounded-full" />
            )}
          </a>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Posts posts={posts} loading={postsLoading} />
      </TabsContent>
      <TabsContent value="products">
        <div className="mt-3">
          <div className="px-4 py-2 font-bold text-lg flex justify-between">
            <h2>My Collections</h2>
            <Link
              href={`${store}/collections`}
              // onClick={() => router.push("/fabin/collections")}
              className="hover:cursor-pointer flex transition-transform duration-500 hover:translate-x-2 items-center justify-center"
            >
              <FaArrowRightLong size={27} />
            </Link>
          </div>
          <div className="flex overflow-scroll scrollbar-hide px-2">
            {loading && (
              <p>
                <CollectionCardSkeleton />
              </p>
            )}
            {!loading &&
              !error &&
              collections.map((collection) => (
                <CollectionCardSmall
                  key={collection.slug}
                  src={collection.image} // Correctly map the image URL
                  text={collection.name}
                  desc={`${collection.products.length} products`}
                  url={`/${collection.slug}`}
                />
              ))}
          </div>
        </div>
        <ProductsList
          products={products}
          loading={productsLoading}
          store={store}
        />
      </TabsContent>
    </Tabs>
  );
}
