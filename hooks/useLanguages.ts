"use client";

import { useQuery } from "@tanstack/react-query";
import * as languageService from "@/services/languageService";
import { Language } from "@/types/Language";

export const useLanguages = () => {
  const { data = [], isLoading, isError, refetch } = useQuery<Language[], Error>({
    queryKey: ["languages"],
    queryFn: languageService.getLanguages,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    
  });

  return {
    languages: data,
    isLoading,
    isError,
    refetch,
  };
};
