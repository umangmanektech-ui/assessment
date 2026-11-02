import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onDeleteClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDeleteClick }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-full">
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        <div className="absolute top-3 left-3">
          <span className="text-xs bg-white/95 px-2.5 py-1 rounded-md font-medium text-gray-700 shadow-xs">
            {product.category}
          </span>
        </div>

        {product.stock === 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
              Out of stock
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-gray-900 text-xs font-semibold shadow-md backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link
          to={`/products/${product.id}`}
          className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 mb-1"
          title={product.name}
        >
          {product.name}
        </Link>

        {product.description ? (
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed flex-1">
            {product.description}
          </p>
        ) : (
          <p className="text-xs text-gray-400 italic mb-3 flex-1">No description provided</p>
        )}

        <div className="flex items-baseline justify-between pt-3 border-t border-gray-100 mt-auto">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Price</span>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block">Stock</span>
            <span
              className={`text-xs font-semibold ${
                product.stock === 0 ? 'text-red-600' : 'text-gray-700'
              }`}
            >
              {product.stock === 0 ? 'Out of stock' : `${product.stock} units`}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-gray-100">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Details
          </Link>

          <Link
            to={`/products/${product.id}/edit`}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Edit product"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onDeleteClick(product)}
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
