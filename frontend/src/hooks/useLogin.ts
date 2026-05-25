import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { apiFetch, saveToken } from "../lib/api";
import { TOKEN_QUERY_KEY } from "./useAuthToken";

type LoginInput = { email: string; password: string };

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      await saveToken(token);

      await apiFetch("/users/login", {
        method: "POST",
        body: JSON.stringify({ name: cred.user.displayName ?? email, email }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TOKEN_QUERY_KEY });
      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
