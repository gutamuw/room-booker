import { Text, View, StyleSheet } from "react-native";
import { formatSlot } from "../src/utils/formatSlot";

type props = {
  name: string;
  date: string;
  slot: string;
};

export default function SummaryCard({ name, date, slot }: props) {
  return (
    <View style={styles.card}>
      <Row label="Rum" value={name} />
      <Divider />
      <Row label="Datum" value={date} capitalize />
      <Divider />
      <Row label="Tid" value={formatSlot(Number(slot))} />
    </View>
  );
}

function Row({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text
        style={[styles.rowValue, capitalize && { textTransform: "capitalize" }]}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 12,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  rowLabel: {
    fontSize: 13,
    color: "#787774",
    letterSpacing: 0.2,
  },
  rowValue: {
    fontSize: 15,
    color: "#111111",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#EAEAEA",
  },
});
