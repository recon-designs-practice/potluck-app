import { create } from "zustand";

const useTestStore = create((set) => ({
  testValue: false,
  setTestValue: (set: any) => (state: any) => ({ testValue: !state.testValue})
}));

export default useTestStore