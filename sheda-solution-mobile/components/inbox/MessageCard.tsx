import { View, Image, TouchableOpacity } from "react-native"
import InterSemiBold from "../Text/InterSemiBold"
import InterRegular from "../Text/InterRegular"
import { PROFILE } from "@/constants/images-icons"
import { router } from "expo-router"

interface MessageCardProps {
  isSeller: boolean
  propertyTitle?: string
  lastMessage?: string
  time?: string
  sellerName?: string
  propertyId?: string
}

const MessageCard = ({
  isSeller,
  propertyTitle = "House title",
  lastMessage = "The buyer's last message shows here.....",
  time = "10:15",
  sellerName = "Seller name",
  propertyId = "1", // Default property ID for navigation
}: MessageCardProps) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/chat", params: { id: propertyId, isSeller: isSeller ? "true" : "false" } })
      }
      className="flex-row justify-between items-center border-borderColor border-b p-3"
    >
      <View className="flex-row gap-2 items-center">
        <View className="justify-center items-center rounded-full overflow-hidden w-[38px] h-[38px]">
          <Image source={PROFILE} style={{ width: 38, height: 38 }} />
        </View>

        <View className="">
          <View className="flex-row gap-3 items-center m-1">
            <InterSemiBold className="text-sm/[150%]">{propertyTitle}</InterSemiBold>
            {isSeller && <InterRegular className="bg-[#C1272D0A] px-2 rounded-lg text-xs">{sellerName}</InterRegular>}
          </View>
          <InterRegular className="text-sm text-secondaryText">{lastMessage}</InterRegular>
        </View>
      </View>

      <InterRegular className="text-sm text-secondaryText">{time}</InterRegular>
    </TouchableOpacity>
  )
}

export default MessageCard
