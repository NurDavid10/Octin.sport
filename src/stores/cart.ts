import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
  shipping: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) => i.variant.id === variant.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variant.id === variant.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, variant.stock) }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, variant, quantity }] };
        });
      },

      removeItem: (variantId) =>
        set((state) => ({ items: state.items.filter((i) => i.variant.id !== variantId) })),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.variant.id !== variantId)
            : state.items.map((i) =>
                i.variant.id === variantId ? { ...i, quantity: Math.min(quantity, i.variant.stock) } : i
              ),
        })),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),
      shipping: () => (get().subtotal() > 200 ? 0 : 25),
      total: () => get().subtotal() + get().shipping(),
    }),
    { name: 'kickstore-cart' }
  )
);
