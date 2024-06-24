// components/StoreNavbarSkeleton.tsx
import React from 'react';

const StoreNavbarSkeleton: React.FC = () => {
    return (
        <div className="relative flex justify-between items-center py-4 lg:px-8 px-2 bg-white gap-x-6 w-full animate-pulse">
            <div className="relative">
                <div className="bg-gray-200 w-32 h-8 rounded-md"></div>
                <div className="bg-gray-200 w-24 h-4 mt-1 rounded"></div>
            </div>
            <div className="flex md:hidden justify-end items-center" id="hamburger">
                <div className="sidebar_toggle">
                    <div className="toggle_btn bg-gray-200 w-5 h-1 my-1"></div>
                    <div className="toggle_btn bg-gray-200 w-5 h-1 my-1"></div>
                    <div className="toggle_btn bg-gray-200 w-5 h-1 my-1"></div>
                </div>
            </div>

            <div className="hidden md:flex gap-x-6">
                <div className="bg-gray-200 px-2 w-8 h-8 rounded-md"></div>
                <div className="bg-gray-200 px-2 w-8 h-8 rounded-md"></div>
                <div className="bg-gray-200 px-2 w-8 h-8 rounded-md"></div>
            </div>
        </div>
    );
};

export default StoreNavbarSkeleton;
