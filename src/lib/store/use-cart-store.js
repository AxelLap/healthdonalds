import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: {},

      addItem: (item) => {
        set((state) => {
          const itemId = item.id;
          // On vérifie si le state existe
          if (state.items[itemId]) {
            // Si le state existe on incremente
            state.items[itemId] = {
              quantity: state.items[itemId].quantity + 1,
              item,
            };
          } else {
            //si le state n'existe pas  on le créé
            state.items[itemId] = {
              quantity: 1,
              item,
            };
          }

          return {
            items: { ...state.items },
          };
        });
      },

      removeItem: (item) => {
        set((state) => {
          const itemId = item.id;
          if (!state.items[itemId]) {
            return {};
          }

          state.items[itemId] = {
            quantity: state.items[itemId].quantity - 1,
            item,
          };

          if (state.items[itemId]?.quantity <= 0) {
            delete state.items[itemId];
          }
          return {
            items: { ...state.items },
          };
        });
      },
    }),
    { name: "cart-store" }
  )
);

export const useCartQuantity = () => {
  return useCartStore((s) => {
    return Object.values(s.items).reduce((acc, val) => {
      return acc + val.quantity;
    }, 0);
  });
};
