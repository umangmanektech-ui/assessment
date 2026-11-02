import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, PackageCheck, AlertCircle, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useProductStore } from '../store/useProductStore';
import { formatPrice, formatDate } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const product = useProductStore((state) =>
    state.products.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-gray-200 shadow-xs max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 max-w-sm">
          The product you are looking for does not exist or may have been deleted.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const handleDeleteClick = () => {
    toast(`Delete "${product.name}"?`, {
      description: 'Are you sure? This action cannot be undone.',
      action: {
        label: 'Delete',
        onClick: () => {
          deleteProduct(product.id);
          toast.success(`"${product.name}" was deleted successfully.`);
          navigate('/products');
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/products/${product.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-gray-700 shadow-xs transition-colors"
          >
            <Edit2 className="w-4 h-4 text-blue-600" />
            <span>Edit</span>
          </Link>

          <button
            onClick={handleDeleteClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-sm font-semibold text-rose-700 shadow-xs transition-colors"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-200 min-h-[340px]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[420px] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                {product.category}
              </span>
              {product.stock === 0 && (
                <span className="text-xs px-2.5 py-1 rounded-md font-semibold bg-red-100 text-red-700 border border-red-200">
                  Out of stock
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatPrice(product.price)}
            </div>

            <div className="pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description || 'No description provided for this item.'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShoppingBag className="w-4 h-4 text-gray-400" /> Inventory Stock
              </span>
              <span className="font-semibold text-gray-800">
                {product.stock === 0 ? 'Out of stock' : `${product.stock} units available`}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-gray-400" /> Added to Catalog
              </span>
              <span className="font-semibold text-gray-800">{formatDate(product.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <PackageCheck className="w-4 h-4 text-gray-400" /> Product ID
              </span>
              <span className="font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                {product.id}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
