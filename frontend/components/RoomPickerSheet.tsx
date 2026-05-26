import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetFlatList } from "@gorhom/bottom-sheet";
import type { RoomAvailability } from "../src/hooks/useGetAvailability";

type Props = {
  rooms: RoomAvailability[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

const RoomPickerSheet = forwardRef<BottomSheetModal, Props>(
  ({ rooms, selectedIds, onChange }, ref) => {
    const allSelected = selectedIds.length === 0;

    const toggle = (roomId: string) => {
      if (selectedIds.includes(roomId)) {
        onChange(selectedIds.filter((id) => id !== roomId));
      } else {
        onChange([...selectedIds, roomId]);
      }
    };

    return (
      <BottomSheetModal
        backgroundStyle={{
          borderTopWidth: 1,
          borderColor: "#e5e5e5",
        }}
        ref={ref}
        enableDynamicSizing={false}
        snapPoints={["60%", "90%"]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Välj rum</Text>
          {!allSelected && (
            <Pressable onPress={() => onChange([])} hitSlop={8}>
              <Text style={styles.clear}>Rensa</Text>
            </Pressable>
          )}
        </View>

        <BottomSheetFlatList
          data={rooms}
          keyExtractor={(room) => room.roomId}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Pressable
              style={[styles.row, allSelected && styles.rowSelected]}
              onPress={() => onChange([])}
            >
              <Text style={styles.rowText}>Alla rum</Text>
            </Pressable>
          }
          renderItem={({ item }) => {
            const selected = !allSelected && selectedIds.includes(item.roomId);
            return (
              <Pressable
                style={[styles.row, selected && styles.rowSelected]}
                onPress={() => toggle(item.roomId)}
              >
                <Text style={styles.rowText}>{item.roomName}</Text>
              </Pressable>
            );
          }}
        />
      </BottomSheetModal>
    );
  },
);

export default RoomPickerSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111111" },
  clear: { fontSize: 14, color: "#787774" },
  list: { paddingHorizontal: 12, paddingBottom: 40 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  rowSelected: { backgroundColor: "#f1f1ef" },
  rowText: { fontSize: 15, color: "#111111" },
  check: { fontSize: 16, color: "#111111" },
});
