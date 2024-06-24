import axios from "axios";
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const successRes = (data: any) => ({ data, error: null });
const errorRes = (error: any) => ({ data: null, error });

const get = async (path: string) => {
  try {
    const resp = await axios.get(path);
    return successRes(resp.data);
  } catch (error) {
    return errorRes(error);
  }
};

const StoreAPI = { get };

export default StoreAPI;
