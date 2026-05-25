import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
          Alert.alert("Inloggning misslyckades", err instanceof Error ? err.message : "Okänt fel"),
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>Konto</Text>
        <Text style={styles.title}>Logga in</Text>
        <Text style={styles.subtitle}>
          Använd din arbetsadress för att fortsätta.
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>E-post</Text>
            <TextInput
              style={styles.input}
              placeholder="namn@företag.se"
              placeholderTextColor="#9A9A98"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Lösenord</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9A9A98"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={login.isPending}
            style={({ pressed }) => [
              styles.button,
              login.isPending && styles.buttonDisabled,
              pressed && styles.buttonPressed,
            ]}
          >
            {login.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Logga in</Text>
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "center",
    gap: 8,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#787774",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -1,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 15,
    color: "#787774",
    marginTop: 8,
    marginBottom: 36,
    lineHeight: 22,
  },
  form: { gap: 20 },
  field: { gap: 8 },
  label: {
    fontSize: 12,
    color: "#111111",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 16,
    color: "#111111",
  },
  button: {
    marginTop: 16,
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
