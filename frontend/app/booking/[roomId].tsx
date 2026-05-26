import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import useCreateBooking from "../../src/hooks/useCreateBooking";
import { formatSlot } from "../../src/utils/formatSlot";
import { formatBookingDate } from "../../src/utils/formatBookingDate";
import SummaryCard from "../../components/SummaryCard";

export default function BookingScreen() {
  const { id, name, date, slot } = useLocalSearchParams<{
    id: string;
    name: string;
    date: string;
    slot: string;
  }>();
  const { mutate: createBooking, isPending} = useCreateBooking();

  const handleConfirm = () => {
    createBooking(
      { roomId: id, date, slot: Number(slot) },
      { onSuccess: () => router.replace("/booking/result") },
    );
  };

  const formattedDate = formatBookingDate(date);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Steg 2 av 2</Text>
        <Text style={styles.title}>Bekräfta bokning</Text>
        <Text style={styles.subtitle}>
          Granska detaljerna nedan innan du bokar.
        </Text>
      </View>

      <SummaryCard 
        name={name}
        date={formattedDate}
        slot={slot}
      />

      <Pressable
        onPress={handleConfirm}
        disabled={isPending}
        style={({ pressed }) => [
          styles.button,
          isPending && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
      >
        {isPending ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Boka</Text>
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
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
  },
  header: { gap: 6 },
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
    lineHeight: 20,
  },
  error: {
    color: "#9F2F2D",
    fontSize: 13,
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
