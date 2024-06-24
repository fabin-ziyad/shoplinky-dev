import {
  getCookie as getNextCookie,
  setCookie as setNextCookie,
} from "cookies-next";
import Cookies from "js-cookie";

// Helper function to stringify a value
const stringify = (value: any) => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return value;
  }
};

// Function to get a cookie
export const getCookie = (key: any, { req, res }: any = {}) => {
  if (typeof window !== "undefined") {
    const value = Cookies.get(key);
    if (value) {
      const details = JSON.parse(value);
      return details.token;
    }
    return null;
  } else {
    const value = getNextCookie(key, { req, res });
    if (value) {
      const details = JSON.parse(value);
      return details.token;
    }
    return null;
  }
};

// Function to set a cookie
export const setCookie = (key: any, value: any, options = {}) => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);
  const cookieValue = stringify(value);
  if (typeof window !== "undefined") {
    Cookies.set(key, cookieValue, { expires: expirationDate });
  } else {
    setNextCookie(key, cookieValue, options);
  }
};

// Function to delete a cookie
export const deleteCookie = (key: any, options = {}) => {
  if (typeof window !== "undefined") {
    Cookies.remove(key, options);
  } else {
    setNextCookie(key, "", { ...options, maxAge: 0 });
  }
};

export const getUserTokenFromCookie = () => {
  const userDetails = Cookies.get("userDetails");
  if (userDetails) {
    const details = JSON.parse(userDetails);
    return details.token;
  }
  return null;
};
