import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="my-bookings" options={{ title: "My bookings" }} />
      <Tabs.Screen name="logout" options={{ title: "Logout" }} />
    </Tabs>
  );
}
