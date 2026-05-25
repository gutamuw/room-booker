import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function BookingScreen() {
  const { roomId } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book room</Text>
      <Text>Room: {roomId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});
