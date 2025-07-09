import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import {
  PROFILE,
  NOTIFICATION,
  LOCK,
  BLACKBIN,
  CHEVRONRIGHT, WALLET,
} from "@/assets/icons";
import BackBtn from "@/components/common/BackBtn";
import Icon from "@/components/common/Icon";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import { router } from "expo-router";


const profileSettingList = [
  {
    id: 1,
    icon: PROFILE,
    title: "Profile Info",
    chevronRight: true,
    GOTO: () => {
      router.push('./personal-info')
    },
  },
  {
    id: 2,
    icon: NOTIFICATION,
    title: "Notification settings",
    chevronRight: true,
    GOTO: () => {
      router.push('./notification-setting')
    },
  },
  {
    id: 3,
    icon: WALLET,
    title: "Wallet recovery",
    chevronRight: true,
    GOTO: () => {
      router.push('./wallet-recovery')
    },
  },
  {
    id: 4,
    icon: LOCK,
    title: "Change password",
    chevronRight: true,
    GOTO: () => {
      router.push('./change-password')
    },
  },
  {
    id: 5,
    icon: BLACKBIN,
    title: "Delete account",
    chevronRight: true,
    GOTO: () => {
      router.push('./delete-account')
    },
  },
];

const ProfileSetting = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ paddingVertical: 20 }}
      >
        <View className="flex-row items-center gap-4 ml-5">
          <BackBtn />
          <InterSemiBold className="text-lg/5">My Profile</InterSemiBold>
        </View>

        <View className="mt-3">
          {profileSettingList.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.GOTO}
              className="flex-row items-center justify-between px-5 py-5 border-b border-[#0000001A]"
            >
              <View className="flex-row items-center gap-3">
                <Icon icon={item.icon} width={20} height={20} />
                <InterRegular className="text-base/[150%]">
                  {item.title}
                </InterRegular>
              </View>
              {item.chevronRight && (
                <Icon icon={CHEVRONRIGHT} width={10} height={20} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetting;
