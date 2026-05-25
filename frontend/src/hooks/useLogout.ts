import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearToken } from "../lib/api";
import { TOKEN_QUERY_KEY } from "./useAuthToken";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await clearToken();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TOKEN_QUERY_KEY });
      queryClient.removeQueries({ queryKey: ["me"] });
    },
  });
}
