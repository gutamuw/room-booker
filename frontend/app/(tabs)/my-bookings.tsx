import { View, Text, StyleSheet } from "react-native";
import { parseISO, format } from "date-fns";
import { sv } from "date-fns/locale";
import useGetBookings from "../../src/hooks/useGetBookings";

export default function MyBookingsScreen() {
  const {bookings} = useGetBookings();

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.noBookings}>Du har inga bokningar.</Text>
      ) : (
        bookings.map((booking, index) => (
          <View key={index} style={styles.bookingCard}>
            <Text style={styles.roomName}>{booking.roomName}</Text>
            <Text style={styles.bookingDetails}>
              {format(parseISO(booking.date), "EEE d MMM", { locale: sv })} – {booking.slot}:00
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
  noBookings: { fontSize: 18, color: "gray" },
  bookingCard: { padding: 16, borderWidth: 1, borderColor: "gray", borderRadius: 8, marginVertical: 8 },
  roomName: { fontSize: 18, fontWeight: "bold" },
  bookingDetails: { fontSize: 16, color: "gray" },
});
