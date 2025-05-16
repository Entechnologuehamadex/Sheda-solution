import { View, SafeAreaView, ScrollView } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import CurrencyList from "./CurrencyList";
import Button from "@/components/common/Button";
import InterMedium from "@/components/Text/InterMedium";
import { useLocalSearchParams, router } from "expo-router";

const SelectCurrency = () => {
  const { id } = useLocalSearchParams();
  const propertyId = id; // Handle string | string[]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl py-5"
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
        // style={{ paddingVertical: 20 }}
      >
        {/* header */}
        <View className="flex-row gap-4 items-center px-5">
          <BackBtn />
          <InterSemiBold className="text-base/5">Select currency</InterSemiBold>
        </View>

        <View className="px-5 py-3 mt-5 mb-2">
          <InterRegular className="text-sm">Available assets</InterRegular>
          <InterRegular className="text-xs/[150%] text-secondaryText">
            The cost equivalent will be charged from your available balance
          </InterRegular>
        </View>

        {/* dummy currency list */}
        <CurrencyList />
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl p-5">
        <Button
          onPress={() =>
            router.push({
              pathname: '/property-summary',
              params: { id: propertyId },
            })
          }
          className="rounded-lg"
        >
          <InterMedium className="text-white">Proceed</InterMedium>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectCurrency;
