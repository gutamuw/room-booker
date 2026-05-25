import { View, Text, StyleSheet, Button } from "react-native";
import { useMe } from "../../src/hooks/useMe";
import { useLogout } from "../../src/hooks/useLogout";

export default function LogoutScreen() {
  const { user } = useMe();
  const logout = useLogout();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logged in as</Text>
      <Text style={styles.name}>{user?.name ?? "—"}</Text>
      <Button
        title={logout.isPending ? "Logging out..." : "Logout"}
        onPress={() => logout.mutate()}
        disabled={logout.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 18 },
  name: { fontSize: 24, fontWeight: "bold" },
});
