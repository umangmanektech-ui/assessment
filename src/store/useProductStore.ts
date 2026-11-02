import { create } from 'zustand';
import { persist, type StorageValue } from 'zustand/middleware';
import type { Product } from '../types/product';

interface ProductStoreState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const STORAGE_KEY = 'products';

function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && typeof parsed === 'object' && Array.isArray(parsed.state?.products)) {
      return parsed.state.products;
    }
    return [];
  } catch {
    return [];
  }
}

const customStorage = {
  getItem: (name: string): StorageValue<ProductStoreState> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(name);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return {
          state: {
            products: parsed,
            setProducts: () => {},
            addProduct: () => {},
            updateProduct: () => {},
            deleteProduct: () => {},
          },
          version: 0,
        };
      }
      return parsed;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<ProductStoreState>): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(name, JSON.stringify(value));
    } catch {
      return;
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(name);
    } catch {
      return;
    }
  },
};

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      products: getStoredProducts(),
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            String(p.id) === String(product.id) ? product : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => String(p.id) !== String(id)),
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: customStorage,
      merge: (persistedState, currentState) => {
        if (!persistedState) return currentState;
        const stored = persistedState as Partial<ProductStoreState> | Product[];
        const products = Array.isArray(stored)
          ? stored
          : Array.isArray(stored.products)
          ? stored.products
          : currentState.products;
        return {
          ...currentState,
          products,
        };
      },
    }
  )
);
