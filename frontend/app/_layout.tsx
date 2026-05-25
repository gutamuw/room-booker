import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { queryClient } from "../src/lib/queryClient";
import { useMe } from "../src/hooks/useMe";

function AuthGate() {
  const { isAuthenticated, isLoading } = useMe();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    const onLogin = segments[0] === "login";
    if (!isAuthenticated && !onLogin) {
      router.replace("/login");
    } else if (isAuthenticated && onLogin) {
      router.replace("/(tabs)/bookings");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="booking/[roomId]" options={{ headerShown: true, title: "Book room" }} />
      <Stack.Screen name="booking/result" options={{ headerShown: true, title: "Booking confirmed" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate />
    </QueryClientProvider>
  );
}
