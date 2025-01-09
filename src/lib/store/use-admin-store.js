import { create } from "zustand";

export const useAdminStore = create((set) => ({
  adminEnabled: false,
  toggleAdminEnabled: () => {
    set((state) => ({ adminEnabled: !state.adminEnabled }));
  },
}));
