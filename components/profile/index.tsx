"use client";
import React, { useState } from "react";
import ViewProfile from "./viewProfile";
import EditProfile from "./editProfile";
import { useEditProfile } from "./profile.hooks";

const GetProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleSwitch = () => {
    setIsEdit(!isEdit);
  };
  const { handleSubmit, initialValues, validationSchema, handleImageChange ,getProfile,profileData} =
    useEditProfile();
  return (
    <div>
      {isEdit ? (
        <EditProfile
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleImageChange={handleImageChange}
          handle={handleSwitch}
        />
      ) : (
          <ViewProfile handle={handleSwitch} data={profileData} />
      )}
    </div>
  );
};

export default GetProfile;
