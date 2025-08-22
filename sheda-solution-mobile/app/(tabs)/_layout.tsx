import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMode } from "@/contexts/ModeContext";
import { Image } from "react-native";
import AuthGuard from "@/components/AuthGuard";

export default function TabLayout() {
  const { isSeller } = useMode();

  return (
    <AuthGuard requireAuth={true}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#C1272D",
          tabBarInactiveTintColor: "#000000",
          tabBarLabelPosition: "below-icon",
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 3,
            borderTopColor: "#e0e0e0",
            height: 60,
            justifyContent: "center",
          },
          tabBarLabelStyle: {
            fontFamily: "Manrope-Medium",
            fontSize: 12,
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="home"
                size={24}
                color={focused ? "#C1272D" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="saved/index"
          options={{
            title: isSeller ? "Activity" : "Saved",
            tabBarIcon: ({ color, size, focused }) =>
              isSeller ? (
                <Image
                  source={require("@/assets/images/activity-icon.png")}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: focused ? "#C1272D" : "black",
                  }}
                  resizeMode="contain"
                />
              ) : (
                <AntDesign
                  name="hearto"
                  size={24}
                  color={focused ? "#C1272D" : "black"}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="history/index"
          options={{
            title: isSeller ? "List" : "History",
            tabBarIcon: ({ color, size, focused }) =>
              isSeller ? (
                <Image
                  source={require("@/assets/images/list-icon.png")}
                  style={{
                    width: 35,
                    height: 35,
                    tintColor: focused ? "#C1272D" : "black",
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Octicons
                  name="history"
                  size={24}
                  color={focused ? "#C1272D" : "black"}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="inbox/index"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={24}
                color={focused ? "#C1272D" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet/index"
          options={{
            title: "Portfolio",
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color={focused ? "#C1272D" : "black"}
              />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
