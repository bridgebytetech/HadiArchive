import { useState } from 'react';
import { uploadService } from '@/services/uploadService';
import { QuickUploadResponse } from '@/types';
import { toast } from 'sonner';

interface UseImageUploadOptions {
  onSuccess?: (result: QuickUploadResponse) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload(options?: UseImageUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<QuickUploadResponse | null>(null);

  const upload = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('শুধুমাত্র ছবি আপলোড করা যাবে');
      }

      if (file.size > 32 * 1024 * 1024) {
        throw new Error('ছবির সাইজ ৩২MB এর বেশি হতে পারবে না');
      }

      setProgress(30);
      const response = await uploadService.quickUpload(file);
      setProgress(100);
      setResult(response);
      
      options?.onSuccess?.(response);
      toast.success('ছবি আপলোড সফল হয়েছে');
      
      return response;
    } catch (error: any) {
      const err = error instanceof Error ? error : new Error('আপলোড ব্যর্থ হয়েছে');
      options?.onError?.(err);
      toast.error(err.message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setProgress(0);
  };

  return {
    upload,
    isUploading,
    progress,
    result,
    reset,
  };
}