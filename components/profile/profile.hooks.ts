import { getUserData } from "@/services/user";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const useEditProfile = () => {
  const [image, setImage] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const getProfile = useAuthStore((state: any) => state.user);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserData(getProfile?.email);
        if (response.success) {
          setProfileData(response?.data?.data);
        } else {
          toast.error("Failed to fetch User");
        }
      } catch (error) {
        toast.error("Failed to fetch User");
      }
    };
    fetchUserProfile();
  }, [getProfile]);
  const initialValues = {
    username: getProfile.store?.name || "",
    name: getProfile.name || "",
    bio: getProfile.bio || "",
    gender: getProfile.sex || "",
    country: "",
    interests: getProfile.interested || [],
    instagram: getProfile.socialLinks?.instagram || "",
    twitter: getProfile.socialLinks?.twitter || "",
    tiktok: getProfile.socialLinks?.tiktok || "",
    youtube: getProfile.socialLinks?.youtube || "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Profile Name is required"),
    username: Yup.string().required("User Name is required"),
    bio: Yup.string().required("Bio is required"),
    gender: Yup.string().required("Gender is required"),
  });
  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return {
    initialValues,
    handleSubmit,
    validationSchema,
    getProfile,
    handleImageChange,
    profileData
  };
};
