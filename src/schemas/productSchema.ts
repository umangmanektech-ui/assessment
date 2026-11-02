import * as yup from 'yup';
import type { ProductCategory } from '../types/product';

export const CATEGORIES: ProductCategory[] = ['Electronics', 'Clothing', 'Home', 'Other'];

export const productSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters long'),

  price: yup
    .number()
    .transform((_value, originalValue) =>
      originalValue === '' || originalValue === null || originalValue === undefined
        ? undefined
        : Number(originalValue)
    )
    .typeError('Price must be a valid number')
    .required('Price is required')
    .positive('Price must be greater than 0'),

  category: yup
    .mixed<ProductCategory>()
    .oneOf(CATEGORIES, 'Please select a valid category')
    .required('Category is required'),

  stock: yup
    .number()
    .transform((_value, originalValue) =>
      originalValue === '' || originalValue === null || originalValue === undefined
        ? undefined
        : Number(originalValue)
    )
    .typeError('Stock must be a valid number')
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),

  description: yup
    .string()
    .max(200, 'Description cannot exceed 200 characters')
    .nullable()
    .optional(),

  image: yup
    .string()
    .required('An image is required. Please upload a JPG or PNG file.'),
}).required();

export type ProductSchemaType = yup.InferType<typeof productSchema>;
