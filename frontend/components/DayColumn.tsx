import { View, Text, StyleSheet } from "react-native";
import { parseISO, format } from "date-fns";
import { sv } from "date-fns/locale";
import { DayAvailability } from "../src/hooks/useGetAvailability";
import { RoomSlot } from "./RoomSlot";

export const VALID_SLOTS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

type Props = {
  day: DayAvailability;
  roomId: string;
  roomName: string;
};

export default function DayColumn({ day, roomId, roomName }: Props) {
  const date = parseISO(day.date);
  const weekday = format(date, "EEE", { locale: sv }).toUpperCase();
  const dayNumber = format(date, "d");

  return (
    <View style={styles.column}>
      <View style={styles.headerWrap}>
        <Text style={styles.weekday}>{weekday}</Text>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
      </View>
      {VALID_SLOTS.map(slot => (
        <RoomSlot
          key={slot}
          day={day}
          slot={slot}
          roomId={roomId}
          roomName={roomName}
        />
      ))}
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
});
