"use client";

import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  getLanguageKeys,
  getLanguageKeyById,
  createLanguageKey,
  updateLanguageKey,
  deleteLanguageKey,
} from "@/services/languageKeyService";
import { LanguageKey } from "@/types/LanguageKey";

export const useLanguageKeys = () => {
  const { data = [], isLoading, isError, refetch } = useQuery<LanguageKey[], Error>({
    queryKey: ["languageKeys"],
    queryFn: getLanguageKeys,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  return {
    languageKeys: data,
    isLoading,
    isError,
    refetch,
  };
};

export const useLanguageKey = (id: number) => {
  return useQuery<LanguageKey, Error>({
    queryKey: ["languageKeys", id],
    queryFn: () => getLanguageKeyById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateLanguageKey = (): UseMutationResult<
  LanguageKey,
  Error,
  Partial<LanguageKey>
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<LanguageKey>) => createLanguageKey(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["languageKeys"] }),
  });
};

export const useUpdateLanguageKey = (): UseMutationResult<
  LanguageKey,
  Error,
  { id: number; data: Partial<LanguageKey> }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateLanguageKey(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["languageKeys"] });
      queryClient.invalidateQueries({ queryKey: ["languageKeys", variables.id] });
    },
  });
};

export const useDeleteLanguageKey = (): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteLanguageKey(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["languageKeys"] }),
  });
};
