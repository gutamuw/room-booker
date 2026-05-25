import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useLogin } from "../src/hooks/useLogin";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleLogin = () => {
    login.mutate(
      { email, password },
      {
        onError: (err) =>
          Alert.alert("Login failed", err instanceof Error ? err.message : "Unknown error"),
      },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={login.isPending ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={login.isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: "bold" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
});
