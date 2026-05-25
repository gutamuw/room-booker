import { View, Text, Pressable, StyleSheet } from "react-native";
import { parseISO, format } from "date-fns";
import { sv } from "date-fns/locale";
import { DayAvailability } from "../src/hooks/useGetAvailability";

export const VALID_SLOTS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

type Props = {
  day: DayAvailability;
  onSlotPress?: (date: string, slot: number) => void;
}

export default function DayColumn({ day, onSlotPress }: Props) {
  const date = parseISO(day.date);
  const weekday = format(date, "EEE", { locale: sv }).toUpperCase();
  const dayNumber = format(date, "d");

  return (
    <View style={styles.column}>
      <View style={styles.headerWrap}>
        <Text style={styles.weekday}>{weekday}</Text>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
      </View>
      {VALID_SLOTS.map(slot => {
        const isAvailable = day.availableSlots.includes(slot);
        return (
          <Pressable
            key={slot}
            disabled={!isAvailable}
            onPress={() => onSlotPress?.(day.date, slot)}
            style={({ pressed }) => [
              styles.slot,
              isAvailable ? styles.available : styles.booked,
              pressed && isAvailable && styles.pressed,
            ]}
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
  column: { flex: 1, paddingHorizontal: 3 },
  headerWrap: {
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  weekday: {
    fontSize: 10,
    color: "#787774",
    letterSpacing: 1,
    fontWeight: "500",
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -0.4,
    marginTop: 2,
  },
  slot: {
    height: 36,
    marginVertical: 3,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  available: {
    backgroundColor: "#FFFFFF",
    borderColor: "#111111",
  },
  booked: {
    backgroundColor: "#F7F6F3",
    borderColor: "#EAEAEA",
  },
  pressed: {
    backgroundColor: "#111111",
  },
  slotText: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "500",
  },
  bookedText: {
    color: "#9A9A98",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
});
