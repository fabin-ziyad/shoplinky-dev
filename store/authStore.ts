import { create } from "zustand";
import Cookies from "js-cookie";
import { deleteCookie } from "@/lib/cookieManager";

interface UserData {
  _id?: string;
  token?: string;
  uid?: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  initializing: boolean;
  setUser: (data: UserData) => void;
  clearUser: () => void;
}

// Default initial state for server-side rendering
const getInitialState = (): AuthState => ({
  user: null,
  isAuthenticated: false,
  initializing: true,
  setUser: () => {},
  clearUser: () => {},
});

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  setUser: (data) => set({ user: data, isAuthenticated: true, initializing: false }),
  clearUser: () => set({ user: null, isAuthenticated: false, initializing: false }),
}));

// Function to handle client-side initialization and subscription
export const initializeAuthStore = () => {
  const set = useAuthStore.getState().setUser;
  const clear = useAuthStore.getState().clearUser;

  // Initialize state from storage
  const userCookie = Cookies.get("shky_cookie");
  const userLocalStorage = localStorage.getItem("shoplinkyData");

  if (userCookie) {
    const user = JSON.parse(userCookie);
    set(user);
  } else if (userLocalStorage) {
    const user = JSON.parse(userLocalStorage);
    set(user);
  } else {
    clear();
  }

  // Subscribe to store changes
  useAuthStore.subscribe((state) => {
    if (state.user) {
      localStorage.setItem("shoplinkyData", JSON.stringify(state.user));
    } else {
      deleteCookie("shky_cookie");
      localStorage.removeItem("shoplinkyData");
    }
  });
};
