"use client";
import Modal from "@/components/Modal/Modal";
import React from "react";
import AddCollections from "./addCollections";
import { useUpdateCollection } from "./collection.hooks";

const EditCollection = ({ slug }: any) => {
  const { collectionData } = useUpdateCollection(slug);
  return (
    // <Modal isOpen={isOpen} onClose={()=>onClose(false)} title="Edit Collection">
    <AddCollections data={collectionData} isEdit={true} />
    // </Modal>
  );
};

export default EditCollection;
