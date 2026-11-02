import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { useProductStore } from '../store/useProductStore';
import type { Product, ProductCategory, SortOption } from '../types/product';

export function useProductCatalog() {
  const products = useProductStore((state) => state.products);
  const deleteProductStore = useProductStore((state) => state.deleteProduct);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('newest');
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const getProductById = useCallback(
    (id: string): Product | undefined => {
      return products.find((p) => String(p.id) === String(id));
    },
    [products]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      const productToDelete = products.find((p) => String(p.id) === String(id));
      if (!productToDelete) return;

      deleteProductStore(id);
      toast.success(`"${productToDelete.name}" was deleted successfully.`);
    },
    [products, deleteProductStore]
  );

  return {
    products,
    filteredProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    resetFilters,
    getProductById,
    deleteProduct,
  };
}
