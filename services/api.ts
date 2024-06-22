import axios from "axios";

import { deleteCookie, getCookie } from "@/lib/cookieManager";
import { toast } from "react-toastify";

import router from "next/navigation";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      deleteCookie("token");
      toast.error("Session Expired Please Login Again");
      router.redirect("/login");
    } else {
      return Promise.reject(error);
    }
  }
);

const getToken = (cookieOption: any) => getCookie("shky_cookie", cookieOption);
const needLoginRes = { data: null, error: { message: "Need Login" } };
const successRes = (data: any) => ({ data, error: null });
const errorRes = (error: any) => ({ data: null, error });

const get = async (
  path: string,
  headers?: any,
  cookieOption?: { req: any; res: any } | null,
  noToken?: boolean
) => {
  try {
    const Authorization = getToken(cookieOption);
    if (Authorization || noToken) {
      const resp = await axios.get(path, {
        headers: { authorization: "Bearer " + Authorization, ...headers },
      });
      return successRes(resp.data);
    }
    return needLoginRes;
  } catch (error) {
    return errorRes(error);
  }
};

const post = async (
  path: string,
  body?: any,
  headers?: any,
  cookieOption?: { req: any; res: any } | null,
  noToken?: boolean
) => {
  try {
    const Authorization = getToken(cookieOption);
    if (Authorization || noToken) {
      const resp = await axios.post(path, body, {
        headers: { authorization: "Bearer " + Authorization, ...headers },
      });
      return successRes(resp.data);
    }
    return needLoginRes;
  } catch (error) {
    return errorRes(error);
  }
};

const patch = async (
  path: string,
  body?: any,
  headers?: any,
  cookieOption?: { req: any; res: any }
) => {
  try {
    const Authorization = getToken(cookieOption);
    if (Authorization) {
      const resp = await axios.patch(path, body, {
        headers: { authorization: "Bearer " + Authorization, ...headers },
      });
      return successRes(resp.data);
    }
    return needLoginRes;
  } catch (error) {
    return errorRes(error);
  }
};

const update = async (
  path: string,
  body?: any,
  headers?: any,
  cookieOption?: { req: any; res: any }
) => {
  try {
    const Authorization = getToken(cookieOption);
    if (Authorization) {
      const resp = await axios.put(path, body, {
        headers: { authorization: "Bearer " + Authorization, ...headers },
      });
      return successRes(resp.data);
    }
    return needLoginRes;
  } catch (error) {
    return errorRes(error);
  }
};

const remove = async (
  path: string,
  headers?: any,
  cookieOption?: { req: any; res: any },
  noToken?: boolean
) => {
  try {
    const Authorization = getToken(cookieOption);
    if (Authorization || noToken) {
      const resp = await axios.delete(path, {
        headers: { authorization: "Bearer " + Authorization, ...headers },
      });
      return successRes(resp.data);
    }
    return needLoginRes;
  } catch (error) {
    return errorRes(error);
  }
};

const API = { get, post, patch, update, remove };

export default API;
