import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-gray-500 mb-6">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" /> Go to Products Catalog
      </Link>
    </div>
  );
};

