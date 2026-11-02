import React, { useRef, useState } from 'react';
import { Upload, X, AlertCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  imagePreview: string;
  errorMessage?: string;
  isProcessing?: boolean;
  onFileSelect: (file: File | null) => void;
  onRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  imagePreview,
  errorMessage,
  isProcessing = false,
  onFileSelect,
  onRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        Product Image <span className="text-rose-500">*</span>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleChange}
        className="hidden"
      />

      {imagePreview ? (
        <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-16/9 sm:aspect-2/1 flex items-center justify-center shadow-xs">
          <img
            src={imagePreview}
            alt="Product preview"
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl bg-white text-gray-900 text-xs font-semibold hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" /> Change Image
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>

          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] font-medium backdrop-blur-xs">
            Preview loaded
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50/50 hover:bg-gray-50'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-sm font-medium text-gray-600">Processing image...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                JPG or PNG only • Maximum 500 KB
              </p>
            </>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1.5 animate-shake">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
