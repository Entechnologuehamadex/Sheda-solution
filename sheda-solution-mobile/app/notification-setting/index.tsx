
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Toggle from "react-native-toggle-input";
import { router } from "expo-router";

interface NotificationItem {
  id: number;
  title: string;
}

const notificationList: NotificationItem[] = [
  { id: 1, title: "Allow Messages" },
  { id: 2, title: "Push notifications" },
  { id: 3, title: "Email notifications" },
  { id: 4, title: "SMS notifications" },
];

const NotificationSetting = () => {
  // Initialize toggle states for each notification item
  const [notificationSettings, setNotificationSettings] = useState<{
    [key: number]: boolean;  //need to change this and manage each notification state separately
    // This will hold the toggle state for each notification item
  }>(
    notificationList.reduce((acc, item) => {
      acc[item.id] = false; // Default to false for all settings
      return acc;
    }, {} as { [key: number]: boolean })
  );

  // Toggle handler for each notification item
  const handleToggle = (id: number) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ paddingVertical: 20 }}
      >
        {/* Header */}
        <View className="flex-row items-center gap-4 ml-5">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Notification settings</InterSemiBold>
        </View>

        {/* Notification List */}
        <View className="mt-5">
          {notificationList.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleToggle(item.id)}
              className="flex-row items-center justify-between px-5 py-4 border-b border-[#0000001A]"
            >
              <InterRegular className="text-base text-primaryText">
                {item.title}
              </InterRegular>

              <Toggle
                color={"#C1272D"} // Use your primary color
                size={20}
                filled={true}
                circleColor={"white"}
                toggle={notificationSettings[item.id]}
                setToggle={() => handleToggle(item.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationSetting;