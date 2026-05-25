import { View, Text, StyleSheet, Button } from "react-native";
import { useMe } from "../../src/hooks/useMe";
import { useLogout } from "../../src/hooks/useLogout";

export default function LogoutScreen() {
  const { user } = useMe();
  const logout = useLogout();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inloggad som</Text>
      <Text style={styles.name}>{user?.name ?? "—"}</Text>
      <Button
        title={logout.isPending ? "Loggar ut..." : "Logga ut"}
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
