import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  category: null,
  setCategory: (newCategory) => {
    set({ category: newCategory });
  },
}));
