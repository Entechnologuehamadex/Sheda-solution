import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import Icon from "@/components/common/Icon";
import { HOMEICON } from "@/constants/images-icons";
import { INBOX } from "@/assets/icons";

export default function TabLayout() {
  return (
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
          justifyContent: 'center'
        },
        tabBarLabelStyle: {
          fontFamily: "Manrope-Medium",
          fontSize: 12,
          marginBottom: 5,
          alignItems: "center",
          justifyContent: 'center',
          
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
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
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
          title: "History",
          tabBarIcon: ({ color, size, focused }) => (
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
  );
}
