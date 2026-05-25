import { View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  fromDate?: string;
  toDate?: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const formatLabel = (from?: string, to?: string) => {
  if (!from || !to) return "";
  const fromDay = Number(from.slice(8, 10));
  const toDay = Number(to.slice(8, 10));
  const month = Number(from.slice(5, 7));
  const months = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  return `${fromDay}–${toDay} ${months[month - 1]}`;
};

export default function DateNavigator({ fromDate, toDate, canGoPrev, canGoNext, onPrev, onNext }: Props) {
  return (
    <View style={styles.row}>
      <Pressable disabled={!canGoPrev} onPress={onPrev} style={[styles.arrow, !canGoPrev && styles.disabled]}>
        <Text style={styles.arrowText}>‹</Text>
      </Pressable>
      <Text style={styles.label}>{formatLabel(fromDate, toDate)}</Text>
      <Pressable disabled={!canGoNext} onPress={onNext} style={[styles.arrow, !canGoNext && styles.disabled]}>
        <Text style={styles.arrowText}>›</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.3 },
  arrowText: { fontSize: 22, fontWeight: "600" },
  label: { fontSize: 16, fontWeight: "600" },
});
