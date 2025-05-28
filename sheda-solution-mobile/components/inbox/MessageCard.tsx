import { View, Image, TouchableOpacity } from "react-native";
import InterSemiBold from "../Text/InterSemiBold";
import InterRegular from "../Text/InterRegular";
import { PROFILE } from "@/constants/images-icons";
import { router } from "expo-router";

const MessageCard = () => {

    return(
        <TouchableOpacity onPress={() => router.push('/chat')} className="flex-row justify-between items-center border-borderColor border-b p-3">
        <View className="flex-row gap-2 items-center">
          <View className="justify-center items-center rounded-full overflow-hidden w-[38] h-[38]">
            <Image source={PROFILE} style={{ width: 38, height: 38 }} />
          </View>

          <View className="">
            <View className="flex-row gap-3 items-center m-1">
              <InterSemiBold className="text-sm/[150%]">
                House title
              </InterSemiBold>
              <InterRegular className="bg-[#C1272D0A] px-2 rounded-lg">
                Seller name
              </InterRegular>
            </View>
            <InterRegular>
              The buyer's last message shows here.....
            </InterRegular>
          </View>
        </View>

        <InterRegular>10:15</InterRegular>
      </TouchableOpacity>
    )
}

export default MessageCard;