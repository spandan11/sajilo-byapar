import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface ProductWithQuantity extends Product {
  quantity: number;
}

interface CartState {
  //   products: Array<
  //     Product & {
  //       quantity: number;
  //     }
  //   >;
  products: Array<ProductWithQuantity>;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCart = create<CartState>()(
  persist(
    (set) => ({
      products: [],
      addProductToCart: (product: ProductWithQuantity) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },
      removeProductFromCart: (productId: string) => {
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== productId,
          ),
        }));
      },
      clearCart: () => {
        set({ products: [] });
      },
    }),
    {
      name: "cart-items",
    },
  ),
);
