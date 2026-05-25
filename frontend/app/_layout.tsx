import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
      <Stack.Screen name="booking/[roomId]" options={{ headerShown: true, title: "Boka rum", headerBackTitle: "Tillbaka" }} />
      <Stack.Screen name="booking/result" options={{ headerShown: true, title: "Bokning bekräftad", headerBackTitle: "Tillbaka" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <AuthGate />
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
