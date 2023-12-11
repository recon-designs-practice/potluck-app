import { create } from "zustand";

const useSetupStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set((state: any) => ({ isLoggedIn: !state.isLoggedIn })),
}));

export default useSetupStore;
