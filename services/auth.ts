import { handleApiResponse } from "@/utils/common";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const createUser = async (values: any) => {
  try {
    const response = await axios.post(`/createUser`, {
      data: values,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
