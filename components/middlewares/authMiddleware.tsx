"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../ui/Loader";
import { sliceUserData } from "@/utils/common";
import auth from "@/hooks/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { deleteCookie, getCookie, setCookie } from "@/lib/cookieManager";
import axios from "axios";

const TOKEN_REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initializing, isAuthenticated, setUser, clearUser } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const path = usePathname();
  const authenticatedRoutesPrefix = "/dashboard";
  const isAuthRequiredRoute = path.startsWith(authenticatedRoutesPrefix);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        let userData: any = sliceUserData(firebaseUser);
        setUser(userData);
        setCookie("shky_cookie", { token: token });
      } else {
        deleteCookie("shky_cookie");
        clearUser();
      }
      setAuthChecked(true);
    });


    return () => unsubscribe();
  }, [setUser, clearUser]);

  useEffect(() => {
    if (!authChecked) return; // Wait until authentication check is complete
    if (!isAuthenticated && isAuthRequiredRoute && !getCookie("shky_cookie")) {
      router.replace("/");
    }
  }, [authChecked, isAuthenticated, isAuthRequiredRoute]);

  useEffect(() => {
    const userCookie = getCookie("shky_cookie");
    if (!userCookie && isAuthenticated) {
      signOut(auth).catch((error) =>
        console.error("Error logging out from Firebase:", error)
      );
      clearUser();
      router.replace("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const refreshAuthToken = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const token = await user.getIdToken(true); // Force refresh the token
          setCookie("shky_cookie", { token: token });
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }
    };

    const intervalId = setInterval(refreshAuthToken, TOKEN_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  if (initializing) {
    return <Loader />;
  }

  return <>{children}</>;
}
