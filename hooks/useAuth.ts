import { useMutation, useQuery, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { LoginRequest, LoginResponse } from "@/types/Auth";
import { User } from "@/types/User";

// Login mutation
export function useLogin(): UseMutationResult<LoginResponse, Error, LoginRequest, unknown> {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest, unknown>({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// Fetch current user query
export function useCurrentUser() {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: authService.fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

// Logout hook
export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    authService.logout();
    queryClient.removeQueries({ queryKey: ["currentUser"] });
  };
}
