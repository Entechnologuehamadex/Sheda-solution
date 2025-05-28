import { Text, View, SafeAreaView, ScrollView } from "react-native";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Button from "@/components/common/Button";
import historyHeader from "../../../constants/historyHeader";
import InterRegular from "@/components/Text/InterRegular";
import { useEffect, useState } from "react";
import { NoHistory } from "@/components/history/NoHistory";
// import { ScrollView } from "react-native-gesture-handler";
import { historyData } from "../../../constants/history-data";
import HouseCard from "@/components/HouseCard";
import { HouseProps, CancelledHistory } from "@/types";
import HistoryList from "../../../components/history/HistoryList";

const History = () => {
  const [activeIndex, setIsActiveIndex] = useState<null | number>(0);
  const [activeItem, setActiveItem] = useState<null | any>("Ongoing");
  const [history, setHistory] = useState<
    (HouseProps | CancelledHistory)[] | null
  >(null);
  const [isLoading, setLoading] = useState(false);

  const handleHistoryClick = (index: number, item: string) => {
    setIsActiveIndex(index);
    setActiveItem(item);
  };

  console.log(activeItem);

  useEffect(() => {
    const fetchHistory = () => {
      setLoading(true);
      try {
        const data = historyData[activeItem];
  
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [activeItem]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="">
          <InterSemiBold className="text-lg/5">History</InterSemiBold>
        </View>

        {/* Headlist */}
        <View className="flex-row justify-between mt-4">
          {historyHeader.map((item, index) => (
            <Button
              key={index}
              color={activeIndex === index ? "#C1272D" : "#C1272D0A"}
              onPress={() => handleHistoryClick(index, item)}
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

        {/* History List */}
        <View className="mt-4">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <InterRegular className="text-secondaryText">
                Loading...
              </InterRegular>
            </View>
          ) : !history || history.length === 0 ? (
            <NoHistory headText={activeItem} />
          ) : (
            <HistoryList histories={history} historyType={activeItem} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
