import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InterSemiBold from "@/components/Text/InterSemiBold"
import Messages from "@/components/inbox/Messages"
import { useMode } from "@/contexts/ModeContext"

const Inbox = () => {
  const { isSeller } = useMode()

  return (
    <SafeAreaView className="flex-1">
      <View className="container flex-1 mx-auto max-w-2xl px-5 py-5">
        <View className="mb-5">
          <InterSemiBold className="text-lg/5">Messages</InterSemiBold>
        </View>
        <Messages isSeller={isSeller} />
      </View>
    </SafeAreaView>
  )
}

export default Inbox
