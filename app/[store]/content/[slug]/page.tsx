"use client";
import StoreLayout from "@/components/layouts/StoreLayout";
import ListProductsForPosts from "@/components/storeFront/posts/Products/ListProductsForPosts";
import { useFetchContentData } from "@/components/storeFront/posts/posts.hooks";
import React from "react";

const ContentItem = () => {
    const { content, getUserName } = useFetchContentData();
    return (
        <StoreLayout
            storeData={getUserName}
            switchNavbar={true}
            title="My Posts"
        >
            <div className="flex justify-center mt-5">
                <ListProductsForPosts data={content} user={getUserName} />
            </div>
        </StoreLayout>
    );
};

export default ContentItem;
