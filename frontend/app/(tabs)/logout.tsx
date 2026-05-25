import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useMe } from "../../src/hooks/useMe";
import { useLogout } from "../../src/hooks/useLogout";

export default function LogoutScreen() {
  const { user } = useMe();
  const logout = useLogout();

  const initial = (user?.name ?? "—").trim().charAt(0).toUpperCase() || "—";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.eyebrow}>Inloggad som</Text>
        <Text style={styles.name}>{user?.name ?? "—"}</Text>
      </View>

      <Pressable
        onPress={() => logout.mutate()}
        disabled={logout.isPending}
        style={({ pressed }) => [
          styles.button,
          logout.isPending && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
      >
        {logout.isPending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Logga ut</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    gap: 24,
  },
  card: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 12,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#787774",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -0.4,
  },
  button: {
    marginTop: "auto",
    backgroundColor: "#111111",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: { backgroundColor: "#333333" },
  buttonPressed: { transform: [{ scale: 0.98 }] },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
