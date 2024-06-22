import { create } from "zustand";
import Cookies from "js-cookie";
import { deleteCookie } from "@/lib/cookieManager";

interface StoreState {
  store: any;
  isInitialized: boolean;
  setStore: (data: any) => void;
  clearStore: () => void;
  getStoreData: () => any;
}

// Default initial state
const getInitialState = (): StoreState => ({
  store: null,
  isInitialized: false,
  setStore: () => {},
  clearStore: () => {},
  getStoreData: () => null,
});

export const useStore = create<StoreState>((set, get) => ({
  ...getInitialState(),
  setStore: (data) => {
    // console.log("Setting store data:", data); // Debug log
    set({ store: data, isInitialized: true });
  },
  clearStore: () => {
    // console.log("Clearing store data"); // Debug log
    set({ store: null, isInitialized: false });
  },
  getStoreData: () => get().store,
}));

// Function to handle client-side initialization and subscription
export const initializeStore = () => {
  const set = useStore.getState().setStore;
  const clear = useStore.getState().clearStore;

  const storeLocalStorage = localStorage.getItem("currentStoreData");

  if (storeLocalStorage) {
    const store = JSON.parse(storeLocalStorage);
    // console.log("Initializing store from localStorage:", store); // Debug log
    set(store);
  } else {
    clear();
  }

  useStore.subscribe((state) => {
    if (state.store) {
      localStorage.setItem("currentStoreData", JSON.stringify(state.store));
    } else {
      localStorage.removeItem("currentStoreData");
    }
  });
};

// Function to change store data
export const changeStore = (storeData: any) => {
  const set = useStore.getState().setStore;
  // console.log("Changing store data:", storeData); // Debug log
  set(storeData);
  localStorage.setItem("currentStoreData", JSON.stringify(storeData));
};

// Function to get store data
export const getStoreData = (): any | null => {
  // console.log("Retrieving store data from state:", useStore.getState().store); // Debug log
  return useStore.getState().getStoreData();
};
