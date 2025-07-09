import React from "react";
import Icon from "@/components/common/Icon";
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ARROWBACK, AUDIORECORD, MEDIAPLUS, TOGGLER } from "@/assets/icons";
import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import StyledTextInput from "@/components/input/textInput";
import BackBtn from "@/components/common/BackBtn";
import SupportMenu from "./SupportMenu";
import { useState } from "react";

const Support = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <SafeAreaView className="h-screen w-full mx-auto max-w-2xl">
      <View className="flex-row justify-between items-center px-5 p-3">
        <View className="flex-row gap-5 items-center">
          <BackBtn className="h-[inherit] border-none w-fit" />

          <View>
            <InterBold className="text-sm/[150%]">Sheda support</InterBold>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setToggleMenu(!toggleMenu)}
          className="p-2 relative"
        >
          <View pointerEvents="none">
            <Icon icon={TOGGLER} width={8} height={16} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        {toggleMenu && (
          <View className="absolute right-0 top-0 bg-slate-50 z-20">
            <SupportMenu />
          </View>
        )}
      </View>

      <ScrollView
        className="container flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <InterRegular>text messages goes here</InterRegular>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl py-3 px-3">
        <View className="flex-row w-full items-center">
          <Button isFull={false} color="none">
            <Icon icon={MEDIAPLUS} width={14} height={14} />
          </Button>

          <View className="flex-1 h-full">
            <StyledTextInput
              placeholder="write message"
              className="bg-[#0000000D] p-3 rounded-lg h-full text-sm/[150%] text-secondaryText"
            />
          </View>

          <Button isFull={false} color="none">
            <Icon icon={AUDIORECORD} width={14} height={14} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Support;
