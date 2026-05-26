import { View, Text, StyleSheet } from "react-native";
import { RoomAvailability } from "../src/hooks/useGetAvailability";
import DayColumn from "./DayColumn";

type Props = {
  room: RoomAvailability;
  windowStart: number;
  windowSize: number;
}

export default function RoomAvailabilityCard({ room, windowStart, windowSize }: Props) {
  const days = room.days.slice(windowStart, windowStart + windowSize);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{room.roomName}</Text>
        <Text style={styles.capacity}>{room.capacity} pers</Text>
      </View>
      <View style={styles.grid}>
        {days.map(day => (
          <DayColumn
            key={day.date}
            day={day}
            roomId={room.roomId}
            roomName={room.roomName}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -0.2,
  },
  capacity: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 9999,
  },
  grid: { flexDirection: "row" },
});
