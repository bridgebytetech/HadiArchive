import api, { apiRequest } from '@/lib/api';
import { ImageUploadResponse, QuickUploadResponse } from '@/types';

const ADMIN_URL = '/admin/upload';

export const uploadService = {
  // Single image upload
  uploadImage: async (file: File, name?: string): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    let url = `${ADMIN_URL}/image`;
    if (name) url += `?name=${encodeURIComponent(name)}`;
    
    return apiRequest(api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }));
  },

  // Multiple images upload
  uploadMultipleImages: async (files: File[]): Promise<ImageUploadResponse[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    
    return apiRequest(api.post(`${ADMIN_URL}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }));
  },

  // Quick upload (simplified response)
  quickUpload: async (file: File): Promise<QuickUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiRequest(api.post(`${ADMIN_URL}/quick`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }));
  },

  // Upload from URL
  uploadFromUrl: async (url: string, name?: string): Promise<ImageUploadResponse> => {
    let apiUrl = `${ADMIN_URL}/image-url?url=${encodeURIComponent(url)}`;
    if (name) apiUrl += `&name=${encodeURIComponent(name)}`;
    
    return apiRequest(api.post(apiUrl));
  },
};