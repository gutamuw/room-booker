import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import useGetAvailability from "../../src/hooks/useGetAvailability";
import DateNavigator from "../../components/DateNavigator";
import RoomAvailabilityCard from "../../components/RoomAvailabilityCard";

const WINDOW_SIZE = 3;

export default function BookingsScreen() {
  const { data, isLoading, error } = useGetAvailability();
  const [windowStart, setWindowStart] = useState(0);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#111111" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kunde inte ladda tillgänglighet.</Text>
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
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Tillgänglighet</Text>
        <Text style={styles.title}>Välj tid</Text>
      </View>

      <DateNavigator
        fromDate={fromDate}
        toDate={toDate}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={() => setWindowStart(w => Math.max(0, w - WINDOW_SIZE))}
        onNext={() => setWindowStart(w => Math.min(totalDays - WINDOW_SIZE, w + WINDOW_SIZE))}
      />

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {data.rooms.map(room => (
          <RoomAvailabilityCard
            key={room.roomId}
            room={room}
            windowStart={windowStart}
            windowSize={WINDOW_SIZE}
            onSlotPress={(roomId, date, slot) =>
              router.push({ pathname: "/booking/[roomId]", params: { roomId, date, slot } })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  errorText: { fontSize: 14, color: "#787774" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 4,
  },
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
  list: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
});
