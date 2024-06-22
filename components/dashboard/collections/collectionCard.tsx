"use client";
import React, { useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { IoCloseSharp, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineShare } from "react-icons/md";
import { AiOutlineEye, AiTwotoneEdit } from "react-icons/ai";

import Link from "next/link";
import EditCollection from "./editCollection";
import { useCollections } from "./collections.hook";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/button/Button";
import SwitchDemo from "@/components/input/Switch";
import { hoverScale110 } from "@/utils/constants";
import { useCollection } from "./collection.hooks";
import Image from "next/image";
const CollectionListCard = ({ data }: any) => {
  console.log(data)
  const [openModal, setOpenModal] = useState(false);
  // const {
  //   deleteOneCollection,
  //   setDeleteModal,
  //   deleteModal,
  //   isPublished,
  //   viewContent,
  //   setIsPublished,
  //   showActions,
  //   setShowActions,
  //   toggleStatus,
  // } = useCollections();
  const {
    addCollectionPage,
    allCollections,
    deleteModal,
    deleteOneCollection,
    isLoading,
    setDeleteModal,
    setShowActions,
    showActions,
    toggleStatus,
    viewContent,
    editCollectionPage
  } = useCollection();
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-md px-[14px] py-[12px] shadow-md hover:cursor-pointer hover:shadow-lg mt-5 max-w-[330px]">
        <div className="relative">
          <Image
            src={
              data?.image ||
              "https://shoplinky-stage.s3.amazonaws.com/CommonData/Dummy.png"
            }
            alt=""
            height={280}
            width={290}
            className="rounded-md mb-3 h-[280px] w-[290px]"
          />
          <div>
            <h2 className="mb-3 font-semibold">{data.name}</h2>
            <div className="flex justify-center my-2">
              <Button
                label={`Collection Products`}
                variant="custom"
                // disabled={data.products === 0}
                onClick={() => viewContent(data?.slug)}
                className="bg-blue-700 text-white"
              />
            </div>
            <div className="flex justify-between my-2 mt-4">
              {!showActions ? (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Products</p>
                  <p className="text-sm text-gray-400">
                    {data.products.length || 0}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Delete</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <MdOutlineDelete
                      size={24}
                      onClick={() => setDeleteModal(true)}
                    />
                  </div>
                </div>
              )}
              {showActions ? (
                <div className="text-center">
                  <p className="text-sm text-gray-400">Edit</p>
                  <div className="flex justify-center">
                    <AiTwotoneEdit
                      size={24}
                      onClick={() => editCollectionPage(data?.slug)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <div className="flex justify-center">
                    <SwitchDemo
                      toggle={data?.isActive}
                      handleToggle={() => toggleStatus(data?._id)}
                    />
                  </div>
                </div>
              )}
              {!showActions ? (
                <div>
                  <p className="text-sm text-gray-400">Action</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <IoSettingsOutline
                      size={23}
                      onClick={() => setShowActions(!showActions)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400">Close</p>
                  <div
                    className={`flex justify-center text-gray-600 ${hoverScale110}`}
                  >
                    <IoCloseSharp
                      size={24}
                      className="flex justify-center"
                      onClick={() => setShowActions(!showActions)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Delete Collection"
      >
        <h2>Are you sure to delete collection {data.name} ?</h2>
        <div className="flex justify-center">
          <Button
            label="Confirm"
            variant="custom"
            className="mt-2 w-[110px] bg-red-500 text-white"
            onClick={() => deleteOneCollection(data._id)}
          />
        </div>
      </Modal>
      {/* <EditCollection isOpen={openModal} onClose={setOpenModal} data={data} /> */}
    </div>
  );
};

export default CollectionListCard;
