import auth from "@/hooks/Firebase";
import { deleteCookie, setCookie } from "@/lib/cookieManager";
import { getUserData, registerUser } from "@/services/user";
import { useAuthStore } from "@/store/authStore";
import { sliceUserData } from "@/utils/common";
import {
  GoogleAuthProvider,
  deleteUser,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { createUser } from "@/services/auth";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const provider = new GoogleAuthProvider();

interface Values {
  domain: string;
  name?: string;
  email?: string;
  password?: string;
}

export const useRegister = () => {
  const [step, setStep] = useState<number>(1);
  const [domain, setDomain] = useState<string>("");
  const router = useRouter();
  const tempPassword = process.env.NEXT_PUBLIC_TEMP_PASSWORD;
  console.log("Temporary password:", process.env.NEXT_PUBLIC_TEMP_PASSWORD);

  if (!tempPassword) {
    console.error("Temporary password not set in environment variables");
  } else {
    console.log("Temporary password loaded successfully");
  }

  const checkDomainExists = async (values: Values) => {
    const isStoreBlocked = process.env.NEXT_PUBLIC_IS_STORE_BLOCKED === "YES";

    if (process.env.NEXT_PUBLIC_IS_STORE_BLOCKED === "NO") {
      // If store blocking is disabled, redirect to login
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/check-store-name`,
        { storeName: values.domain }
      );
      console.log(response);
      if (response.data.success) {
        setDomain(values.domain);
        setStep(2);
      } else if (!response.data.success) {
        toast.error("Store name is already taken.");
      } else {
        toast.error(
          "An error occurred while checking the store name. Please try again."
        );
      }
    } catch (error) {
      console.error("Error checking store name:", error);
      toast.error(
        "An error occurred while checking the store name. Please try again."
      );
    }
  };

  const handleRegister = async (values: Values) => {
    console.log(values);
    let uid: string | null = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email!,
        values.password!
      );
      uid = userCredential.user.uid;

      const response = await createUser({
        name: values.name,
        email: values.email,
        uid: uid,
        store: { name: values.domain },
      });

      if (response.success) {
        await updateProfile(auth.currentUser!, {
          displayName: values.name,
        });
        toast.success(response.message);
      } else {
        toast.error(response.error);
        throw new Error(response.error);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);

      if (uid) {
        try {
          await deleteUser(auth.currentUser!);
          console.log("User deleted from Firebase due to backend failure.");
        } catch (deleteError: any) {
          console.error("Failed to delete user from Firebase:", deleteError);
          toast.error("Failed to delete user from Firebase.");
        }
      }
    }
  };

  const handleSocialSignUp = (service: any) => {
    // This function can be called for signing up with Google, Facebook, etc.
    console.log("Signing up with:", service, "for domain:", domain);
    // Similar to handleRegister, send the domain to your backend here
  };

  return {
    handleRegister,
    checkDomainExists,
    handleSocialSignUp,
    domain,
    step,
  };
};

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isLogged = false;
  const { setUser } = useAuthStore();
  const initialValues = { email: "" };
  const handleSignIn = async (values: any) => {
    console.log(values);
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (!result || !result.user) {
        toast.error("Unable to Login");
        setIsLoading(false);

        return;
      }
      let data = sliceUserData(result.user);
      try {
        const token = await result?.user?.getIdToken();
        const userData = await axios.post(
          `${BACKEND_URL}/users/getByMail`,
          { email: result?.user.email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let newUserData;

        if (!userData || !userData.data.data || userData.data.data == "") {
          const response = await axios.post(
            `${BACKEND_URL}/users/create`,
            { data: data },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response && response.data && response.data !== "") {
            newUserData = response.data;
          }
        } else {
          newUserData = userData.data.data;
        }
        setCookie("shky_cookie", { token: token });
        data = { ...data, ...newUserData };
        useAuthStore.setState({
          user: { ...data },
          isAuthenticated: true,
          initializing: false,
        });
        toast.success("Logged In Successfully");
        router.push("/dashboard");
        setIsLoading(false);
      } catch (error: any) {
        useAuthStore.getState().clearUser();
        deleteCookie("shky_cookie");
        setIsLoading(false);
        toast.error("Failed to fetch user data: " + error.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Failed to login..");
    }
  };
  const goToRegister = () => {
    router.push("/register");
  };
  const googleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result || !result.user) {
        toast.error("Unable to Login");
        setIsLoading(false);

        return;
      }
      const data = sliceUserData(result.user);
      // setCookie("user_data", data);

      const checkUserExists = await getUserData(data?.email);
      if (!checkUserExists?.success) {
        const createUser = await registerUser(data);
        if (!createUser) {
          toast.error("Failed to create user");
          setIsLoading(false);
          return;
        }
      }

      // setUser(data);
      toast.success("User Logged Successfully");
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Failed to login..");
    }
  };
  const manualSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result || !result.user) {
        toast.error("Unable to Login");
        setIsLoading(false);

        return;
      }
      const data = sliceUserData(result.user);
      // setCookie("user_data", data);

      const checkUserExists = await getUserData(data?.email);
      if (!checkUserExists?.data) {
        const createUser = await registerUser(data);
        if (!createUser) {
          toast.error("Failed to create user");
          setIsLoading(false);
          return;
        }
      }

      // setUser(data);
      toast.success("User Logged Successfully");
      setIsLoading(false);
      router.replace("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message || "Failed to login..");
    }
  };
  const appleSignIn = () => {};
  const facebookSignIn = () => {
    console.log("hii");
  };
  return {
    handleSignIn,
    isLoading,
    router,
    isLogged,
    initialValues,
    googleSignIn,
    appleSignIn,
    facebookSignIn,
    goToRegister,
    manualSignIn,
  };
};
