import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native";
import useGetAvailability from "../../src/hooks/useGetAvailability";
import { useActionSheet } from "../../src/hooks/useActionSheet";
import DateNavigator from "../../components/DateNavigator";
import RoomAvailabilityCard from "../../components/RoomAvailabilityCard";
import RoomPickerSheet from "../../components/RoomPickerSheet";
import { FilterIcon } from "lucide-react-native";

const WINDOW_SIZE = 3; // Visable days in view

export default function BookingsScreen() {
  const { data, isLoading, error } = useGetAvailability();
  const [windowStart, setWindowStart] = useState(0);
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);
  const roomSheet = useActionSheet();

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

  const visibleRooms =
    selectedRoomIds.length === 0
      ? data.rooms
      : data.rooms.filter(room => selectedRoomIds.includes(room.roomId));

  const filterLabel =
    selectedRoomIds.length === 0
      ? "Alla rum"
      : selectedRoomIds.length === 1
        ? data.rooms.find(r => r.roomId === selectedRoomIds[0])?.roomName ?? "1 valt"
        : `${selectedRoomIds.length} valda`;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Tillgänglighet</Text>
            <Text style={styles.title}>Välj tid</Text>
          </View>
          <Pressable style={styles.filterButton} onPress={roomSheet.open}>
            <Text style={styles.filterLabel}>{filterLabel}</Text>
            <FilterIcon color="#111111" size={12} />
          </Pressable>
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
          {visibleRooms.map(room => (
            <RoomAvailabilityCard
              key={room.roomId}
              room={room}
              windowStart={windowStart}
              windowSize={WINDOW_SIZE}
            />
          ))}
        </ScrollView>
      </View>

      <RoomPickerSheet
        ref={roomSheet.ref}
        rooms={data.rooms}
        selectedIds={selectedRoomIds}
        onChange={setSelectedRoomIds}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  errorText: { fontSize: 14, color: "#787774" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  headerText: { gap: 4, flexShrink: 1 },
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
  filterRow: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  filterButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  filterLabel: { fontSize: 14, color: "#111111", fontWeight: "500" },
  filterChevron: { fontSize: 12, color: "#787774" },
  list: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
});
