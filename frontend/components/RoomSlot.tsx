import { Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { DayAvailability } from "../src/hooks/useGetAvailability";

type Props = {
  slot: number;
  day: DayAvailability;
  roomId: string;
  roomName: string;
};

export function RoomSlot({ slot, day, roomId, roomName }: Props) {
  const isAvailable = day.availableSlots.includes(slot);

  const handlePress = () =>
    router.push({
      pathname: "/booking/[roomId]",
      params: { id: roomId, name: roomName, date: day.date, slot },
    });

  return (
    <Pressable
      disabled={!isAvailable}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.slot,
        isAvailable ? styles.available : styles.booked,
        pressed && isAvailable && styles.pressed,
      ]}
    >
      {({ pressed }) => (
        <Text
          style={[
            isAvailable ? styles.slotText : styles.bookedText,
            pressed && isAvailable && styles.pressedSlotText,
          ]}
        >
          {slot}:00
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  pressedSlotText: {
    color: "#FFFFFF",
  },
  bookedText: {
    color: "#9A9A98",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
});
