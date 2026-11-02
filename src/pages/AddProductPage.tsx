import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PlusCircle } from 'lucide-react';
import { ProductForm } from '../components/form/ProductForm';

export const AddProductPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold">New Product</span>
      </nav>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Fill in the details below to add a new item to the product catalog.
            </p>
          </div>
        </div>

        <ProductForm initialProduct={null} />
      </div>
    </div>
  );
};
