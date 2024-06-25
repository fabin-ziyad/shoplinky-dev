import React from "react";

export default function SkeletonTab() {
    return (
        <div className="flex flex-col items-center text-black min-w-[90px] animate-pulse">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-1 w-full bg-transparent rounded-full"></div>
        </div>
    );
}