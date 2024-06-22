import { uploadFile } from "@/services/common";
import {
  createContent,
  deleteContent,
  getContentBySlug,
  getContents,
  toggleOneContent,
  updateOneContent,
} from "@/services/content";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const useContents = () => {
  const [allContents, setContents] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [contentStatuses, setContentStatuses] = useState<any>({});
  const [contentPrUpdated, setContentPrUpdated] = useState(0);
  const [toggleStatus, setToggleStatus] = useState(false);

  useEffect(() => {
    const fetchAllContents = async () => {
      setIsLoading(true);
      try {
        const response = await getContents();
        if (response.success) {
          setContents(response.data?.data);
          const initialStatuses: any = {};
          response?.data?.data.forEach((content: any) => {
            initialStatuses[content.slug] = content.isActive;
          });
          setContentStatuses(initialStatuses);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return toast.error(response.message);
        }
      } catch (error: any) {
        setIsLoading(false);
        return toast.error(error.message);
      }
    };
    fetchAllContents();
  }, [isDeleted, contentPrUpdated]);

  const deleteOneContent = async (slug: string) => {
    try {
      const response = await deleteContent(slug);
      if (response && response.data) {
        setIsDeleted(true);
        return toast.success("Content Deleted Successfully");
      }
      setIsDeleted(false);
      toast.error(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const toggleContent = async (slug: string) => {
    try {
      const toggleStatus = await toggleOneContent(slug);
      if (toggleStatus.data) {
        setContentStatuses((prevStatuses: any) => ({
          ...prevStatuses,
          [slug]: !prevStatuses[slug],
        }));
        setContentPrUpdated((prev) => prev + 1);
        setToggleStatus(true);
        return toast.success(toggleStatus.message);
      } else {
        return toast.error(toggleStatus.message);
      }
    } catch (error: any) {
      return toast.error(error.message);
    }
  };
  return {
    allContents,
    isLoading,
    deleteOneContent,
    toggleContent,
    toggleStatus,
    contentStatuses
  };
};

// ADD
export const useAddContents = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const cancelAdding = () => {
    router.push("/dashboard/contents");
  };
  const defaultInitialValues = {
    title: "",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title Name is required"),
    type: Yup.string().required(
      "Category is required, please add only 1 category"
    ),
  });
  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  const handleContents = async (values: any) => {
    setIsLoading(true);
    try {
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an image");
      }
      const form_data = new FormData();
      form_data.append("content", image);

      const uploadImage = await uploadFile(form_data, "content");
      if (!uploadImage?.data.success) {
        setIsLoading(false);
        return toast.error("Failed to upload Image");
      }
      values = { ...values, image: uploadImage.data.data };
      const response = await createContent(values);
      if (!response) {
        toast.error("Failed to create content");
        setIsLoading(false);
        return;
      } else {
        toast.success("Content created successfully");
        setIsLoading(false);
        router.push("/dashboard/contents");
      }
    } catch (error) {
      toast.error("Failed to create collection");
      setIsLoading(false);
      // modal(false);
    }
  };

  return {
    handleContents,
    defaultInitialValues,
    validationSchema,
    handleImageChange,
    isLoading,
    cancelAdding,
  };
};

// UPDATE
export const useUpdateContent = (slug: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title Name is required"),
    type: Yup.string().required(
      "Category is required, please add only 1 category"
    ),
  });
  const handleImageChange = (convertedFile: any) => {
    setImage(convertedFile);
  };
  useEffect(() => {
    const findContent = async () => {
      try {
        const response = await getContentBySlug(slug);
        console.log(response.data.data);
        if (response.data && response.data?.data) {
          setContent(response.data?.data);
          setImage(response?.data?.data?.image);
        }
      } catch (error) {
        // Handle error
      }
    };
    findContent();
  }, [slug]);
  const initialValues = {
    title: content && content?.title,
    image: content && content?.image,
    type: content && content?.type,
  };
  const handleUpdateContent = async (id: string, values: any) => {
    console.log("enetredf", values);
    setIsLoading(true);
    try {
      console.log(image);
      if (!image) {
        setIsLoading(false);
        return toast.error("Please Select an image");
      }
      if (image !== content.image) {
        const form_data = new FormData();
        form_data.append("content", image);

        const uploadImage = await uploadFile(form_data, "content");
        if (!uploadImage?.data.success) {
          setIsLoading(false);
          return toast.error("Failed to upload Image");
        }
        values = { ...values, image: uploadImage.data.data };
      }
      const response = await updateOneContent(id, values);
      if (!response) {
        toast.error("Failed to update content");
        setIsLoading(false);
        return;
      } else {
        toast.success("Content updated successfully");
        setIsLoading(false);
        router.push("/dashboard/contents");
      }
    } catch (error) {
      toast.error("Failed to updated collection");
      setIsLoading(false);
      // modal(false);
    }
  };

  return {
    handleUpdateContent,
    content,
    initialValues,
    validationSchema,
    handleImageChange,
    image,
    isLoading,
  };
};
