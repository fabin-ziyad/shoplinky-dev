import { handleApiResponse } from "@/utils/common";
import API from "./api";

export const getUserData = async (email: string) => {
  try {
    const fetchUser = await API.post("/users/getUser", { email: email });
    console.log("fetched", fetchUser);
    return handleApiResponse(fetchUser);
  } catch (error) {
    return handleApiResponse({ error });
  }
};

export const registerUser = async (data: any) => {
  try {
    const createUser = await API.post("/users/create", { data: data });
    if (!createUser || createUser.error) {
      return null;
    }
    return createUser;
  } catch (error) {
    return null;
  }
};

export const fetchMyStatsData = async () => {
  try {
    const response = await API.post("/users/overall-data");
    console.log(response);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiResponse({ error });
  }
};
