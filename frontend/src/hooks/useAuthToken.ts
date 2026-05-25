import { useQuery } from "@tanstack/react-query";
import { getToken } from "../lib/api";

export const TOKEN_QUERY_KEY = ["auth-token"] as const;

export function useAuthToken() {
  const query = useQuery({
    queryKey: TOKEN_QUERY_KEY,
    queryFn: async () => (await getToken()) ?? null,
    staleTime: Infinity,
  });

  return { token: query.data ?? null, isLoading: query.isLoading };
}
