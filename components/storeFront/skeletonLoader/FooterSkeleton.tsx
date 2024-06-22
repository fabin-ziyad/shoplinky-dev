// components/FooterSkeleton.tsx
import React from 'react';

const FooterSkeleton: React.FC = () => {
    return (
        <footer className="relative bg-white py-2 px-1 md:p-4 z-50 w-full lg:max-w-[80%]">
            <div className="flex flex-col items-center animate-pulse">
                <div className="max-w-[100px] w-full mt-8 bg-gray-200 rounded-full h-24"></div>
                <h2 className="mt-4 text-lg font-semibold bg-gray-200 h-6 w-32"></h2>
                <p className="text-sm bg-gray-200 h-4 w-48 mt-2"></p>
                <div className="flex mt-4 space-x-7">
                    <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                    <div className="bg-gray-200 h-10 w-10 rounded-full"></div>
                </div>
            </div>
            <div className="mt-6 bg-gray-200 h-24 w-full rounded-lg"></div>
            <div className="py-10 flex flex-col items-center">
                <div className="bg-gray-200 h-8 w-24 mb-2"></div>
                <p className="text-md bg-gray-200 h-4 w-32"></p>
            </div>
        </footer>
    );
}

export default FooterSkeleton;
