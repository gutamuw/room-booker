import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { useAuthToken } from "./useAuthToken";

export type Me = {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
};

export function useMe() {
  const { token, isLoading: tokenLoading } = useAuthToken();

  const query = useQuery<Me>({
    queryKey: ["me"],
    queryFn: () => apiFetch<Me>("/users/me"),
    enabled: !!token,
    retry: false,
  });

  return {
    user: query.data,
    isLoading: tokenLoading || (!!token && query.isLoading),
    isAuthenticated: !!token && !!query.data && !query.isError,
    error: query.error,
  };
}
