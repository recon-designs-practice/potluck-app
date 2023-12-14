import { create } from 'zustand'

const useEventsStore = create((set) => ({
  allEvents: [],
  addAllEvents: (stuffToAdd: any) => set({ allEvents: stuffToAdd })
}))

export default useEventsStore