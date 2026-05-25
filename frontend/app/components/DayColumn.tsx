import { View, Text, Pressable, StyleSheet } from "react-native";
import { DayAvailability } from "../../src/hooks/useGetAvailability";

export const VALID_SLOTS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

interface Props {
  day: DayAvailability;
  onSlotPress?: (date: string, slot: number) => void;
}

export default function DayColumn({ day, onSlotPress }: Props) {
  const dayNumber = Number(day.date.slice(8, 10));

  return (
    <View style={styles.column}>
      <Text style={styles.header}>{dayNumber}</Text>
      {VALID_SLOTS.map(slot => {
        const isAvailable = day.availableSlots.includes(slot);
        return (
          <Pressable
            key={slot}
            disabled={!isAvailable}
            onPress={() => onSlotPress?.(day.date, slot)}
            style={[styles.slot, isAvailable ? styles.available : styles.booked]}
          >
            <Text style={isAvailable ? styles.slotText : styles.bookedText}>
              {slot}:00
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  column: { flex: 1, paddingHorizontal: 2 },
  header: { fontSize: 14, fontWeight: "600", textAlign: "center", marginBottom: 6 },
  slot: {
    height: 40,
    marginVertical: 2,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  available: { backgroundColor: "#dceeff" },
  booked: { backgroundColor: "#e5e5e5" },
  slotText: { color: "#0a4d8c", fontWeight: "500" },
  bookedText: { color: "#999", textDecorationLine: "line-through" },
});
