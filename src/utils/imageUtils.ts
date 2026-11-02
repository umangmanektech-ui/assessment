export const MAX_FILE_SIZE_BYTES = 500 * 1024;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateImageFile(file: File): ImageValidationResult {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file format. Only JPG and PNG files are allowed.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInKb = (file.size / 1024).toFixed(1);
    return {
      isValid: false,
      error: `File is too large (${sizeInKb} KB). Maximum allowed size is 500 KB.`,
    };
  }

  return { isValid: true };
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as data URL'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('Error reading file'));
    reader.readAsDataURL(file);
  });
}

export function compressBase64Image(
  dataUrl: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          maxHeight = height;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}
