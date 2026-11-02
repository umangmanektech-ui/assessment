import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import type { ProductCategory, SortOption } from '../../types/product';
import { CATEGORIES } from '../../schemas/productSchema';

interface ProductFiltersProps {
  searchQuery: string;
  selectedCategory: ProductCategory | 'All';
  sortBy: SortOption;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: ProductCategory | 'All') => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
  isFiltered: boolean;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onReset,
  isFiltered,
}) => {
  const allCategories: (ProductCategory | 'All')[] = ['All', ...CATEGORIES];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name or description..."
            className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative inline-flex items-center">
            <div className="absolute left-3 text-gray-400 pointer-events-none">
              <ArrowUpDown className="w-4 h-4" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium appearance-none focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer transition-all"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="oldest">Sort by: Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shrink-0"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-sm scrollbar-none">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1 inline-flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Category:
        </span>
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gray-900 text-white shadow-xs font-semibold'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
