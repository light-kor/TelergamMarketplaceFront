import apiClient from './client';
import { AdWithRelations } from '../types';

export interface GetAdsParams {
  category_id?: number;
  city_id?: number;
  user_id?: number;
  status?: string;
  limit?: number;
  offset?: number;
}

export const adsApi = {
  getAll: async (params?: GetAdsParams): Promise<AdWithRelations[]> => {
    const response = await apiClient.get<AdWithRelations[]>('/ads', { params });
    return response.data;
  },

  getById: async (id: number): Promise<AdWithRelations> => {
    const response = await apiClient.get<AdWithRelations>(`/ads/${id}`);
    return response.data;
  },
};

