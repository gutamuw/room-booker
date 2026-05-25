import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import useGetAvailability from "../../src/hooks/useGetAvailability";
import DateNavigator from "../components/DateNavigator";
import RoomAvailabilityCard from "../components/RoomAvailabilityCard";

const WINDOW_SIZE = 3;

export default function BookingsScreen() {
  const { data, isLoading, error } = useGetAvailability();
  const [windowStart, setWindowStart] = useState(0);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text>Kunde inte ladda tillgänglighet.</Text>
      </View>
    );
  }

  const totalDays = data.rooms[0]?.days.length ?? 0;
  const canGoPrev = windowStart > 0;
  const canGoNext = windowStart + WINDOW_SIZE < totalDays;

  const visibleDays = data.rooms[0]?.days.slice(windowStart, windowStart + WINDOW_SIZE) ?? [];
  const fromDate = visibleDays[0]?.date;
  const toDate = visibleDays[visibleDays.length - 1]?.date;

  return (
    <View style={styles.container}>
      <DateNavigator
        fromDate={fromDate}
        toDate={toDate}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={() => setWindowStart(w => Math.max(0, w - WINDOW_SIZE))}
        onNext={() => setWindowStart(w => Math.min(totalDays - WINDOW_SIZE, w + WINDOW_SIZE))}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {data.rooms.map(room => (
          <RoomAvailabilityCard
            key={room.roomId}
            room={room}
            windowStart={windowStart}
            windowSize={WINDOW_SIZE}
            onSlotPress={(roomId, date, slot) =>
              router.push({ pathname: "/booking/[roomId]", params: { roomId, date, slot} })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", paddingHorizontal: 16 },
  list: { padding: 16 },
});
