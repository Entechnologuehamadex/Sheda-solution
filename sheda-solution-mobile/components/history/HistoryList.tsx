import { Text, View } from "react-native";
import { properties } from "@/constants/property-mock";
import HouseCard from "@/components/HouseCard";
import OngoingCard from "./OngoingCard";
import { HouseProps, CancelledHistory } from "@/types";
import ExpireCard from "./ExpireCard";
import CancelledCard from "./CancelledCard";
import ActiveCard from "./ActiveCard";


interface HistoryListProps {
    histories: (HouseProps | CancelledHistory)[];
    historyType: "Ongoing" | "Active" | "Cancelled" | "Expired";
  }
  


const HistoryList: React.FC<HistoryListProps> = ({histories, historyType}) => {

     // Map historyType to the appropriate card component
  const getCardComponent = (history: HouseProps | CancelledHistory) => {
    switch (historyType) {
      case "Ongoing":
        return <OngoingCard house={history as HouseProps} />;
      case "Cancelled":
        return <CancelledCard house={history as CancelledHistory} />;
      case "Active":
        return <ActiveCard house={history as HouseProps} />;
      case "Expired":
        return <ExpireCard house={history as HouseProps} />;
      default: // "Expired" or fallback
        return <HouseCard house={history as HouseProps} />;
    }
}

    console.log("HistoryList", histories, historyType);

    // if (historyType === "Ongoing") <OngoingCard house={history} />

        return (
                <View className="flex-row flex-wrap gap-2">
                  {histories.map((history) => (
                    <View key={history.id} className="w-full lg:w-[49%]">
                      {getCardComponent(history)}
                    </View>
                  ))}
                </View>
              );
            };

export default HistoryList;
