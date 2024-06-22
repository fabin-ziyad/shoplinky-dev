import Link from "next/link";

import { CollectionCard } from "@/components/storeFront/collection/CollectionCards";
import Footer from "@/components/storeFront/Footer";

export default function Collections() {
  return (
    <div className="max-w-2xl mx-auto bg-white">
      {/* <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href={"/"}>
          <ArrowLeftIcon className="text-gray-600" />
        </Link>
        <h1 className="text-lg font-semibold">My collections</h1>
        <MoreVerticalIcon className="text-gray-600" />
      </div> */}
      <div className="space-y-4 p-4">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>

      <Footer />
    </div>
  );
}

function ArrowLeftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function MoreVerticalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
