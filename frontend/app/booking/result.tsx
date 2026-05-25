import { View, Text, StyleSheet } from "react-native";

export default function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking confirmed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});
