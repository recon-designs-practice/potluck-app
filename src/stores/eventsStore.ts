import { create } from 'zustand'

const useEventsStore = create((set) => ({
  allEvents: [],
  addAllEvents: (stuffToAdd: any) => set({ allEvents: stuffToAdd })
  // setCurrentUser: (stuffToAdd: any) => set({ currentUser: stuffToAdd})
}))

export default useEventsStore