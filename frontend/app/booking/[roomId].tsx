import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import useCreateBooking from "../../src/hooks/useCreateBooking";

export default function BookingScreen() {
  const { roomId, date, slot } = useLocalSearchParams<{ roomId: string; date: string; slot: string }>();
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  const handleConfirm = () => {
    createBooking(
      { roomId, date, slot: Number(slot) },
      { onSuccess: () => router.replace("/booking/result") }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bekräfta bokning</Text>
      <Text style={styles.line}>Rum: {roomId}</Text>
      <Text style={styles.line}>Datum: {date}</Text>
      <Text style={styles.line}>Tid: {slot}:00</Text>

      {error && <Text style={styles.error}>{(error as Error).message}</Text>}

      <Pressable onPress={handleConfirm} disabled={isPending} style={styles.button}>
        {isPending ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Boka</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  line: { fontSize: 16 },
  error: { color: "#c00", marginTop: 8 },
  button: {
    marginTop: 24,
    backgroundColor: "#0a4d8c",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
