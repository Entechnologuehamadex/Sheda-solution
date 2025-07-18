import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { SUCCESSFUL } from "@/assets/icons";
import Icon from "@/components/common/Icon";

const PaymentSuccessful = () => {
  const handleViewTransaction = () => {
    router.push("/(tabs)/wallet");
  };

  const handleBackToHomepage = () => {
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F8F8]">
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <Icon icon={SUCCESSFUL} width={35} height={35} />

        {/* Title */}
        <InterSemiBold className="text-xl mt-4 text-black mb-6 text-center">
          Payment successful
        </InterSemiBold>

        {/* Description */}
        <InterRegular className="text-sm text-[#666666] text-center mb-12 leading-5 px-4">
          Your funds will be held with us as an escrow and released to the
          seller once documents are released to you.
        </InterRegular>

        {/* Buttons */}
        <View className="flex-row px-3 pb-[30px] space-x-[15px]">
          <Button
            onPress={handleViewTransaction}
            className="flex-1 border border-[#E5E5E5] py-4 rounded-lg self-start"
            style={{ backgroundColor: "white" }}
          >
            <InterSemiBold className="text-black text-l whitespace-nowrap">
              View transaction
            </InterSemiBold>
          </Button>

          <Button
            onPress={handleBackToHomepage}
            className="bg-[#C1272D] px-4 py-4 rounded-lg self-start"
          >
            <InterSemiBold className="text-white text-l whitespace-nowrap">
              Back to homepage
            </InterSemiBold>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccessful;
