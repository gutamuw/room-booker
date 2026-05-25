import { Tabs } from "expo-router";
import { CalendarCheck, CalendarPlus, LogOut } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#111111",
        tabBarInactiveTintColor: "#9A9A98",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#EAEAEA",
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          letterSpacing: 0.3,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#EAEAEA",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: "600",
          color: "#111111",
          letterSpacing: -0.2,
        },
        headerShadowVisible: false,
      }}
    >
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
