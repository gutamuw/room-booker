import { View, Text, StyleSheet } from "react-native";
import { RoomAvailability } from "../../src/hooks/useGetAvailability";
import DayColumn from "./DayColumn";

interface Props {
  room: RoomAvailability;
  windowStart: number;
  windowSize: number;
  onSlotPress?: (roomId: string, date: string, slot: number) => void;
}

export default function RoomAvailabilityCard({ room, windowStart, windowSize, onSlotPress }: Props) {
  const days = room.days.slice(windowStart, windowStart + windowSize);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{room.roomName}</Text>
      <Text style={styles.capacity}>{room.capacity} pers</Text>
      <View style={styles.grid}>
        {days.map(day => (
          <DayColumn
            key={day.date}
            day={day}
            onSlotPress={(date, slot) => onSlotPress?.(room.roomId, date, slot)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 18, fontWeight: "600" },
  capacity: { fontSize: 12, color: "#666", marginBottom: 10 },
  grid: { flexDirection: "row" },
});
