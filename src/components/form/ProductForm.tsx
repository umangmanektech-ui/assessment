import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import type { Product } from '../../types/product';
import { CATEGORIES } from '../../schemas/productSchema';
import { useProductForm } from '../../hooks/useProductForm';
import { ImageUpload } from './ImageUpload';

interface ProductFormProps {
  initialProduct?: Product | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialProduct }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isEditMode,
    imagePreview,
    imageError,
    isProcessingImage,
    handleImageFileChange,
    handleRemoveImage,
    descriptionCharCount,
  } = useProductForm(initialProduct);

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload
        imagePreview={imagePreview}
        errorMessage={imageError || errors.image?.message}
        isProcessing={isProcessingImage}
        onFileSelect={handleImageFileChange}
        onRemove={handleRemoveImage}
      />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1.5">
          Product Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder="e.g. Sony WH-1000XM5 Headphones"
          className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm transition-all focus:outline-hidden focus:ring-2 ${
            errors.name
              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
              : 'border-gray-200 focus:ring-blue-500'
          }`}
        />
        {errors.name && (
          <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Category <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              id="category"
              {...register('category')}
              className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm font-medium appearance-none transition-all focus:outline-hidden focus:ring-2 ${
                errors.category
                  ? 'border-rose-300 focus:ring-rose-500'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>
          {errors.category && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Price (USD) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
              $
            </span>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register('price')}
              placeholder="0.00"
              className={`w-full pl-8 pr-4 py-2.5 rounded-xl border bg-white text-sm transition-all focus:outline-hidden focus:ring-2 ${
                errors.price
                  ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            />
          </div>
          {errors.price && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.price.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Stock Quantity <span className="text-rose-500">*</span>
          </label>
          <input
            id="stock"
            type="number"
            step="1"
            {...register('stock')}
            placeholder="0"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm transition-all focus:outline-hidden focus:ring-2 ${
              errors.stock
                ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
                : 'border-gray-200 focus:ring-blue-500'
            }`}
          />
          {errors.stock && (
            <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
            Description <span className="text-xs text-gray-400 font-normal">(Optional)</span>
          </label>
          <span
            className={`text-xs font-medium ${
              descriptionCharCount > 200 ? 'text-rose-600 font-bold' : 'text-gray-400'
            }`}
          >
            {descriptionCharCount} / 200
          </span>
        </div>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          placeholder="Brief description of product features, dimensions, or details..."
          className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm transition-all focus:outline-hidden focus:ring-2 resize-none ${
            errors.description
              ? 'border-rose-300 focus:ring-rose-500 bg-rose-50/20'
              : 'border-gray-200 focus:ring-blue-500'
          }`}
        />
        {errors.description && (
          <p className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Link
          to={isEditMode && initialProduct ? `/products/${initialProduct.id}` : '/products'}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting || isProcessingImage}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> {isEditMode ? 'Update Product' : 'Add Product'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};
