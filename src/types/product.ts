export type ProductCategory = 'Electronics' | 'Clothing' | 'Home' | 'Other';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  description?: string;
  image: string;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  description?: string;
  image: string;
}

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';
