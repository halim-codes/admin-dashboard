import { useQuery, useQueryClient, useMutation, UseMutationResult } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { User } from "@/types/User";

// Fetch all users
export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: userService.getUsers,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

// Fetch user by id
export function useUser(id: number) {
  return useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: () => userService.getUserById(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
}

// Create user
export function useCreateUser(): UseMutationResult<User, Error, Partial<User>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<User>) => userService.createUser(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}

// Update user
export function useUpdateUser(): UseMutationResult<User, Error, { id: number; data: Partial<User> }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
}

// Delete user
export function useDeleteUser(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
