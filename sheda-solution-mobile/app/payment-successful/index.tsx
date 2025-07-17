import { SafeAreaView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import InterSemiBold from "@/components/Text/InterSemiBold"
import InterRegular from "@/components/Text/InterRegular"
import Button from "@/components/common/Button"

const PaymentSuccessful = () => {
  const { id } = useLocalSearchParams()
  const propertyId = id

  const handleViewTransaction = () => {
    // Navigate to transaction details or wallet
    router.push("/(tabs)/wallet")
  }

  const handleBackToHomepage = () => {
    router.push("/(tabs)/home")
  }

  return (
    <SafeAreaView className="container flex-1 max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 bg-[#E8F5E8] rounded-full justify-center items-center mb-8">
          <View className="w-12 h-12 rounded-full border-[3px] border-[#4CAF50] justify-center items-center">
            <View className="w-5 h-4 border-l-[3px] border-b-[3px] border-[#4CAF50] -rotate-45 mt-[-2px] ml-[1px]" />
          </View>
        </View>

        <InterSemiBold className="text-xl text-black mb-4 text-center">Payment successful</InterSemiBold>

        <InterRegular className="text-sm text-center text-secondaryText mb-12 px-4 leading-6">
          Your funds will be held with us as an escrow and released to the seller once documents are released to you.
        </InterRegular>

        <View className="w-full space-y-4">
          <Button
            onPress={handleViewTransaction}
            className="w-full py-4 rounded-lg border border-[#E5E5E5]"
            style={{ backgroundColor: "white" }}
          >
            <InterSemiBold className="text-black text-base">View transaction</InterSemiBold>
          </Button>

          <Button
            onPress={handleBackToHomepage}
            className="w-full py-4 rounded-lg"
            style={{ backgroundColor: "#C1272D" }}
          >
            <InterSemiBold className="text-white text-base">Back to homepage</InterSemiBold>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PaymentSuccessful
