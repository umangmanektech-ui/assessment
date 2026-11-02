import { AlertCircle, ArrowLeft, ChevronRight, Edit3 } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductForm } from '../components/form/ProductForm';
import { useProductStore } from '../store/useProductStore';

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useProductStore((state) =>
    state.products.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-3xl border border-gray-200 shadow-xs max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          The product you are trying to edit does not exist.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/products" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/products/${product.id}`} className="hover:text-gray-900 transition-colors truncate max-w-[150px]">
          {product.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold">Edit</span>
      </nav>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Update product information, image, category, or inventory stock.
            </p>
          </div>
        </div>

        <ProductForm initialProduct={product} />
      </div>
    </div>
  );
};
