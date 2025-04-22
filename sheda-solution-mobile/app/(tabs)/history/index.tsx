import { Text, View, SafeAreaView } from "react-native";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Button from "@/components/common/Button";
import history from "../../../constants/historyHeader";
import InterRegular from "@/components/Text/InterRegular";
import { useState } from "react";
import { NoPurchase } from "@/components/NoPurchase";


const History = () => {
  const [activeIndex, setIsActiveIndex] = useState<null | number>(0);

  const handleHistoryClick = (index: number) => {
    setIsActiveIndex(index);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="">
          <InterSemiBold className="text-lg/5">History</InterSemiBold>
        </View>

        <View className="flex-row justify-between mt-4">
          {history.map((item, index) => (
            <Button
              key={index}
              color={activeIndex === index ? "#C1272D" : "#C1272D0A"}
              onPress={() => handleHistoryClick(index)}
              className="text-white rounded-lg"
            >
              <InterRegular
                className={
                  activeIndex === index ? "text-white" : "text-secondaryText"
                }
              >
                {item}
              </InterRegular>
            </Button>
          ))}
        </View>

          <NoPurchase/>
      </View>
    </SafeAreaView>
  );
};

export default History;
