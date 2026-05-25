import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { CalendarCheck } from "lucide-react-native";

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <CalendarCheck color="#111111" size={28} />
        </View>
        <Text style={styles.eyebrow}>Klart</Text>
        <Text style={styles.title}>Bokning bekräftad</Text>
        <Text style={styles.subtitle}>
          Du hittar bokningen under Mina bokningar.
        </Text>
      </View>

      <Pressable
        onPress={() => router.replace("/(tabs)/my-bookings")}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Visa mina bokningar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2,
    color: "#787774",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 14,
    color: "#787774",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: "#111111",
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: { transform: [{ scale: 0.98 }] },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
