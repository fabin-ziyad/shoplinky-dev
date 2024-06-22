import DashboardLayout from "@/components/layouts/DashboardLayout";
import GetProfile from "../../../components/profile/index";

import React from "react";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <GetProfile />
    </DashboardLayout>
  );
};

export default ProfilePage;
