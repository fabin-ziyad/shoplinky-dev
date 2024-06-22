// Collections.tsx
"use client";

import React from "react";
import { CollectionCard } from "./CollectionCards";
import { useCollectionsData, Collection } from "./collection.hooks";
import CollectionCardSkeleton from "./CollectionCardSkeleton";

const Collections = () => {
  const { collections, loading } = useCollectionsData();

  if (loading) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <CollectionCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4"> 
      {collections.map((collection: Collection) => (
        <CollectionCard collection={collection} key={collection.slug} />
      ))}
    </div>
  );
};

export default Collections;
