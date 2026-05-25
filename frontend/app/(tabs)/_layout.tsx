import { Tabs } from "expo-router";
import { CalendarCheck, CalendarPlus, LogOut } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bokningar",
          tabBarIcon: ({ color, size }) => <CalendarPlus color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="my-bookings"
        options={{
          title: "Mina bokningar",
          tabBarIcon: ({ color, size }) => <CalendarCheck color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logga ut",
          tabBarIcon: ({ color, size }) => <LogOut color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
