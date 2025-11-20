import apiClient from "@/lib/axios";
import { LanguageKey } from "@/types/LanguageKey";
import { ApiResponse } from "@/types/ApiResponse";

export const getLanguageKeys = async (): Promise<LanguageKey[]> => {
  const response = await apiClient.get<ApiResponse<LanguageKey[]>>("/language-keys");
  return response.data.data;
};

export const getLanguageKeyById = async (id: number): Promise<LanguageKey> => {
  const response = await apiClient.get<ApiResponse<LanguageKey>>(`/language-keys/${id}`);
  return response.data.data;
};

export const createLanguageKey = async (data: Partial<LanguageKey>): Promise<LanguageKey> => {
  const response = await apiClient.post<ApiResponse<LanguageKey>>("/language-keys", data);
  return response.data.data;
};

export const updateLanguageKey = async (
  id: number,
  data: Partial<LanguageKey>
): Promise<LanguageKey> => {
  const response = await apiClient.patch<ApiResponse<LanguageKey>>(`/language-keys/${id}`, data);
  return response.data.data;
};

export const deleteLanguageKey = async (id: number): Promise<void> => {
  await apiClient.delete(`/language-keys/${id}`);
};
