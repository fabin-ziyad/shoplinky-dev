import { signOut } from "firebase/auth";
import auth from "./index";
import { deleteCookie } from "@/lib/cookieManager";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export const handleLogout = async () => {
  try {
    await signOut(auth);
    deleteCookie("user_data");
    toast.warning("Logged out from your account");
  } catch (error: any) {
    console.error("Error signing out: ", error);
    toast.error(error.message || "something went wrong");
  }
};
