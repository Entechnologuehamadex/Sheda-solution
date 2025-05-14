import { View, SafeAreaView, ScrollView } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import CurrencyList from "./CurrencyList";
import Button from "@/components/common/Button";

const SelectCurrency = () => {
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

        <View className="px-5 py-3 mt-5">
            <InterRegular className="text-sm">Available assets</InterRegular>
            <InterRegular className="text-xs/[150%] text-secondaryText">The cost equivalent will be charged from your available balance</InterRegular>
        </View>

        {/* dummy currency list */}
        <CurrencyList />
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl py-5">
            <Button className="rounded-lg">
                <InterRegular className="text-white">Proceed</InterRegular>
            </Button>
        </View>
    </SafeAreaView>
  );
};

export default SelectCurrency;
