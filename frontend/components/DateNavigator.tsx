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

export default function DateNavigator({
  fromDate,
  toDate,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
}: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        disabled={!canGoPrev}
        onPress={onPrev}
        style={({ pressed }) => [
          styles.arrow,
          !canGoPrev && styles.disabled,
          pressed && canGoPrev && styles.pressed,
        ]}
      >
        <Text style={styles.arrowText}>‹</Text>
      </Pressable>

      <Text style={styles.label}>{formatLabel(fromDate, toDate)}</Text>

      <Pressable
        disabled={!canGoNext}
        onPress={onNext}
        style={({ pressed }) => [
          styles.arrow,
          !canGoNext && styles.disabled,
          pressed && canGoNext && styles.pressed,
        ]}
      >
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 4,
  },
  arrow: {
    width: 36,
    height: 36,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: { opacity: 0.35 },
  pressed: { backgroundColor: "#F7F6F3" },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: 0.2,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#111111",
    lineHeight: 22,
  },
});
