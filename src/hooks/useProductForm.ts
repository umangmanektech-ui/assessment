import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Product } from '../types/product';
import { productSchema, type ProductSchemaType } from '../schemas/productSchema';
import { validateImageFile, readFileAsDataURL, compressBase64Image } from '../utils/imageUtils';
import { useProductStore } from '../store/useProductStore';

export function useProductForm(initialProduct?: Product | null) {
  const navigate = useNavigate();
  const addProduct = useProductStore((state) => state.addProduct);
  const updateProduct = useProductStore((state) => state.updateProduct);

  const isEditMode = Boolean(initialProduct);
  const lastLoadedIdRef = useRef<string | null>(null);

  const [imageError, setImageError] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState<boolean>(false);

  const form = useForm<ProductSchemaType>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: initialProduct?.name || '',
      price: initialProduct ? initialProduct.price : ('' as unknown as number),
      category: initialProduct?.category || 'Electronics',
      stock: initialProduct !== undefined && initialProduct !== null ? initialProduct.stock : ('' as unknown as number),
      description: initialProduct?.description || '',
      image: initialProduct?.image || '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const imagePreview = useWatch({ control, name: 'image', defaultValue: initialProduct?.image || '' }) || '';

  useEffect(() => {
    register('image');
  }, [register]);

  useEffect(() => {
    if (initialProduct && initialProduct.id !== lastLoadedIdRef.current) {
      lastLoadedIdRef.current = initialProduct.id;
      reset({
        name: initialProduct.name,
        price: initialProduct.price,
        category: initialProduct.category,
        stock: initialProduct.stock,
        description: initialProduct.description || '',
        image: initialProduct.image,
      });
    }
  }, [initialProduct, reset]);

  const handleImageFileChange = useCallback(
    async (file: File | null) => {
      setImageError(null);
      if (!file) return;

      const validation = validateImageFile(file);
      if (!validation.isValid) {
        setImageError(validation.error || 'Invalid image file.');
        return;
      }

      try {
        setIsProcessingImage(true);
        const rawDataUrl = await readFileAsDataURL(file);
        const compressedDataUrl = await compressBase64Image(rawDataUrl, 800, 800, 0.85);

        setValue('image', compressedDataUrl, { shouldValidate: true, shouldDirty: true });
      } catch {
        setImageError('Failed to read and process image file.');
      } finally {
        setIsProcessingImage(false);
      }
    },
    [setValue]
  );

  const handleRemoveImage = useCallback(() => {
    setValue('image', '', { shouldValidate: true, shouldDirty: true });
    setImageError(null);
  }, [setValue]);

  const onSubmit: SubmitHandler<ProductSchemaType> = useCallback(
    async (values: ProductSchemaType) => {
      const priceNumber = Number(values.price);
      const stockNumber = Number(values.stock);

      if (isEditMode && initialProduct) {
        const updatedProduct: Product = {
          ...initialProduct,
          name: values.name.trim(),
          price: priceNumber,
          category: values.category,
          stock: stockNumber,
          description: values.description ? values.description.trim() : undefined,
          image: values.image,
        };

        updateProduct(updatedProduct);
        toast.success(`"${updatedProduct.name}" updated successfully!`);
        navigate(`/products/${initialProduct.id}`);
      } else {
        const newProduct: Product = {
          id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `prod-${Date.now()}`,
          name: values.name.trim(),
          price: priceNumber,
          category: values.category,
          stock: stockNumber,
          description: values.description ? values.description.trim() : undefined,
          image: values.image,
          createdAt: new Date().toISOString(),
        };

        addProduct(newProduct);
        toast.success(`"${newProduct.name}" added successfully!`);
        navigate('/products');
      }
    },
    [isEditMode, initialProduct, updateProduct, addProduct, navigate]
  );

  const descriptionValue = useWatch({ control, name: 'description', defaultValue: '' }) || '';
  const descriptionCharCount = descriptionValue.length;

  return {
    form,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isEditMode,
    imagePreview,
    imageError,
    isProcessingImage,
    handleImageFileChange,
    handleRemoveImage,
    descriptionCharCount,
  };
}
