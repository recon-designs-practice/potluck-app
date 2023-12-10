import { create } from "zustand";

const useSetupStore = create((set) => ({
  isUserLoggedIn: false,
  setIsUserLoggedIn: (set: any) => (state: any) => ({ isUserLoggedIn: !state.isUserLoggedIn})
}));

export default useSetupStore