import React from 'react';
import { Link } from 'react-router-dom';
import { PackageX, Plus, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  isFiltered?: boolean;
  onResetFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isFiltered = false, onResetFilters }) => {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 my-8">
        <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
          <PackageX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">No matching products found</h3>
        <p className="text-sm text-gray-500 max-w-sm mb-6">
          We couldn&apos;t find any products matching your current search or category filter.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-14 text-center bg-white rounded-2xl border border-dashed border-gray-300 my-8">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
        <PackageX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No products yet</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6 leading-relaxed">
        Your catalog is currently empty. Start building your inventory by adding your first product with an image and details.
      </p>
      <Link
        to="/products/new"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add Product
      </Link>
    </div>
  );
};

