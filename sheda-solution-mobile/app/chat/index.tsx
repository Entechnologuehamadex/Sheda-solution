"use client"

import React from "react"
import Icon from "@/components/common/Icon"
import { View, Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import { AUDIORECORD, MEDIAPLUS, TOGGLER } from "@/assets/icons"
import { APT, PROFILE } from "@/constants/images-icons"
import InterBold from "@/components/Text/InterBold"
import InterRegular from "@/components/Text/InterRegular"
import Button from "@/components/common/Button"
import { router, useLocalSearchParams } from "expo-router"
import StyledTextInput from "@/components/input/textInput"
import BackBtn from "@/components/common/BackBtn"
import InboxMenu from "@/app/chat/InboxMenu"
import { useMode } from "@/contexts/ModeContext"
import InterMedium from "@/components/Text/InterMedium"
import InterSemiBold from "@/components/Text/InterSemiBold" // Import InterSemiBold
import getDetails from "../details/getDetails"
import totalPaymemt from "../../utilities/totalPayment"

const Chat = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false)
  const { isSeller } = useMode()
  const { id } = useLocalSearchParams()
  const propertyId = id as string
  const property = getDetails(propertyId)
  const totalPay = totalPaymemt(property?.price, property?.damages)

  return (
    <SafeAreaView className="h-screen w-full mx-auto max-w-2xl">
      <View className="flex-row justify-between items-center px-5 py-3 border-b border-borderColor">
        <View className="flex-row gap-5 items-center">
          <BackBtn className="h-[inherit] border-none w-fit" />

          <View className="flex-row gap-2">
            <View className="items-center justify-center rounded-full overflow-hidden w-[38px] h-[38px] ">
              <Image source={PROFILE} style={{ width: 38, height: 38 }} />
            </View>
            <View>
              <InterBold className="text-sm/[150%]">{isSeller ? "Amazing homes" : "Seller's Name"}</InterBold>
              <InterRegular className="text-secondaryText text-xs">Active now</InterRegular>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => setToggleMenu(!toggleMenu)} className="p-2 relative">
          <View pointerEvents="none">
            <Icon icon={TOGGLER} width={8} height={16} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <View className="px-5 bg-[#00000008] flex-row gap-3 py-[10px] border-b border-borderColor">
          <Image source={APT} style={{ width: 35, height: 35 }} />
          <View>
            <InterRegular className="text-sm/[150%]">{property?.type || "The house title"}</InterRegular>
            <InterBold>N{property?.price || "320k"}/yr</InterBold>
          </View>
        </View>
        {toggleMenu && (
          <View className="absolute right-0 top-0 bg-white z-10 shadow-md rounded-md">
            <InboxMenu />
          </View>
        )}
      </View>

      <ScrollView
        className="container flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {isSeller && (
          <View className="bg-[#F5F5F5] p-4 rounded-lg self-start max-w-[80%] mb-4">
            <InterMedium className="text-xs/[150%] text-black">
              Payment of N{totalPay}.00 has been released for this property. Press the button below to release documents
              of the property to this buyer and your wallet will be credited instantly.
            </InterMedium>
            <Button
              className="rounded-lg mt-3 bg-primary"
              onPress={() =>
                router.push({
                  pathname: "/release-document",
                  params: { id: propertyId },
                })
              }
            >
              <InterSemiBold className="text-white text-sm">Release documents</InterSemiBold>
            </Button>
            <InterRegular className="text-xs text-right mt-2 text-secondaryText">7:15am</InterRegular>
          </View>
        )}
        <InterRegular>text messages goes here</InterRegular>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl py-3 px-3 bg-white border-t border-borderColor">
        <View className="flex-row w-full items-center">
          <Button isFull={false} color="none" className="p-2">
            <Icon icon={MEDIAPLUS} width={14} height={14} />
          </Button>

          <View className="flex-1 h-full">
            <StyledTextInput
              placeholder="write message"
              className="bg-[#0000000D] p-3 rounded-lg h-full text-sm/[150%] text-secondaryText"
            />
          </View>

          <Button isFull={false} color="none" className="p-2">
            <Icon icon={AUDIORECORD} width={14} height={14} />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Chat
