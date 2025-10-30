import apiClient from "@/lib/axios";
import { Language } from "@/types/Language";
import { ApiResponse } from "@/types/ApiResponse";

export const getLanguages = async (): Promise<Language[]> => {
  const res = await apiClient.get<ApiResponse<Language[]>>("/languages");
  return res.data.data; 
};
