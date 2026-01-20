import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: 0, // Tambahkan state ini agar reaktif

      // Fungsi bantu untuk menghitung ulang total
      calculateTotal: (items) => {
        const total = items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        set({ totalPrice: total });
      },

      addToCart: (item) => {
        const cart = get().cart;
        const existing = cart.find((i) => i.id === item.id);
        let newCart;

        if (existing) {
          newCart = cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          );
        } else {
          newCart = [...cart, { ...item, quantity: 1 }];
        }

        set({ cart: newCart });
        get().calculateTotal(newCart); // Hitung ulang total
      },

      incrementQuantity: (id) => {
        const newCart = get().cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
        set({ cart: newCart });
        get().calculateTotal(newCart);
      },

      decrementQuantity: (id) => {
        const item = get().cart.find((i) => i.id === id);
        let newCart;

        if (item && item.quantity > 1) {
          newCart = get().cart.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
          );
        } else {
          newCart = get().cart.filter((i) => i.id !== id);
        }

        set({ cart: newCart });
        get().calculateTotal(newCart);
      },

      removeFromCart: (id) => {
        const newCart = get().cart.filter((item) => item.id !== id);
        set({ cart: newCart });
        get().calculateTotal(newCart);
      },

      clearCart: () => set({ cart: [], totalPrice: 0 }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

export default useCartStore;
