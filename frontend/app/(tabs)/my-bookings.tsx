import { View, Text, StyleSheet, ScrollView } from "react-native";
import { parseISO, format } from "date-fns";
import { sv } from "date-fns/locale";
import useGetBookings from "../../src/hooks/useGetBookings";

export default function MyBookingsScreen() {
  const { bookings } = useGetBookings();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Översikt</Text>
        <Text style={styles.title}>Mina bokningar</Text>
      </View>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Inga bokningar än</Text>
          <Text style={styles.emptyText}>
            Boka ett rum från fliken Bokningar för att se det här.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        >
          {bookings.map((booking, index) => (
            <View key={index} style={styles.bookingCard}>
              <View style={styles.row}>
                <Text style={styles.roomName}>{booking.roomName}</Text>
                <Text style={styles.timeBadge}>{booking.slot}:00</Text>
              </View>
              <Text style={styles.dateText}>
                {format(parseISO(booking.date), "EEEE d MMMM", { locale: sv })}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
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
  list: { paddingHorizontal: 20, paddingBottom: 32, gap: 10 },
  bookingCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: -0.2,
  },
  timeBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#111111",
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 9999,
  },
  dateText: {
    fontSize: 14,
    color: "#787774",
    textTransform: "capitalize",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  emptyText: {
    fontSize: 14,
    color: "#787774",
    textAlign: "center",
    lineHeight: 20,
  },
});
