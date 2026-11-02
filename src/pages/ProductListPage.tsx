import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useProductCatalog } from '../hooks/useProductCatalog';
import { ProductCard } from '../components/catalog/ProductCard';
import { ProductFilters } from '../components/catalog/ProductFilters';
import { EmptyState } from '../components/catalog/EmptyState';
import type { Product } from '../types/product';

export const ProductListPage: React.FC = () => {
  const {
    products,
    filteredProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    resetFilters,
    deleteProduct,
  } = useProductCatalog();

  const isFiltered = Boolean(searchQuery.trim() || selectedCategory !== 'All' || sortBy !== 'newest');

  const handleDeleteRequest = (product: Product) => {
    toast(`Delete "${product.name}"?`, {
      description: 'Are you sure? This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => deleteProduct(product.id),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage store inventory, monitor stock levels, and update listings.
          </p>
        </div>

        <Link
          to="/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      <ProductFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
        onReset={resetFilters}
        isFiltered={isFiltered}
      />

      {products.length === 0 ? (
        <EmptyState isFiltered={false} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState isFiltered={true} onResetFilters={resetFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDeleteClick={handleDeleteRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};
