import { Image, View } from "react-native";
import { BUSD, ETH } from "@/constants/images-icons";
import InterRegular from "@/components/Text/InterRegular";

const currencies = [
  {
    name: "busd",
    icon: BUSD,
    rate: "0.99",
  },
  {
    name: "eth",
    icon: ETH,
    rate: "2,596",
  },
];
const CurrencyList = () => {
  return (
    <View className="border-b border-borderColor">
      {currencies.map((currency) => (
        <View key={currency.name} className="border-t border-borderColor px-5 py-4 flex-row justify-between">
          {/* <View className=" px-5 py-4"> */}
            <View className="flex-row gap-2 items-center">
              <View className="w-10 h-10">
                <Image
                  source={currency.icon}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <View>
                <InterRegular className="text-sm">
                  {currency.name.toUpperCase()}
                </InterRegular>
                <InterRegular className="text-sm">
                  ${currency.rate}
                </InterRegular>
              </View>
            </View>
            <View>
                <InterRegular className="text-xs/[150%] text-secondaryText italic">user bal</InterRegular>
            </View>
          </View>
        // </View>
      ))}
    </View>
  );
};

export default CurrencyList;
