import { View, Image, SafeAreaView } from "react-native"
import { SUCCESSFUL } from "@/assets/icons"
import InterBold from "@/components/Text/InterBold"
import InterRegular from "@/components/Text/InterRegular"
import Button from "@/components/common/Button"
import { router } from "expo-router"

const DocumentReleaseSuccessful = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center px-5">
      <View className="items-center">
        <View className="w-[100px] h-[100px] rounded-full bg-[#878787] justify-center items-center mb-6">
          <SUCCESSFUL className="w-[50px] h-[50px]" />
        </View>
        <InterBold className="text-2xl/[130%] text-center mb-2">Documents released</InterBold>
        <InterRegular className="text-sm/[150%] text-secondaryText text-center mb-8">
          Documents has been released to the buyer. Your account will be credited
        </InterRegular>
        <Button className="rounded-lg w-full max-w-xs bg-primary" onPress={() => router.push("/home")}>
          <InterBold className="text-white text-base">Back to homepage</InterBold>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default DocumentReleaseSuccessful
