import type React from "react"
import { View } from "react-native"
import HouseCard from "@/components/HouseCard"
import OngoingCard from "./OngoingCard"
import type { HouseProps, CancelledHistory } from "@/types"
import ExpireCard from "./ExpireCard"
import CancelledCard from "./CancelledCard"
import ActiveCard from "./ActiveCard"

interface HistoryListProps {
  histories: (HouseProps | CancelledHistory)[]
  historyType: "Ongoing" | "Active" | "Cancelled" | "Expired"
}

const HistoryList: React.FC<HistoryListProps> = ({ histories, historyType }) => {
  // Map historyType to the appropriate card component
  const getCardComponent = (history: HouseProps | CancelledHistory, index: number) => {
    const key = `${historyType}-${history.id}-${index}`

    switch (historyType) {
      case "Ongoing":
        return <OngoingCard key={key} house={history as HouseProps} />
      case "Cancelled":
        return <CancelledCard key={key} house={history as CancelledHistory} />
      case "Active":
        return <ActiveCard key={key} house={history as HouseProps} />
      case "Expired":
        return <ExpireCard key={key} house={history as HouseProps} />
      default:
        return <HouseCard key={key} house={history as HouseProps} />
    }
  }

  if (!histories || histories.length === 0) {
    return null
  }

  return (
    <View className="flex-1">
      <View className="gap-4">
        {histories.map((history, index) => (
          <View key={`${history.id}-${index}`} className="w-full">
            {getCardComponent(history, index)}
          </View>
        ))}
      </View>
    </View>
  )
}

export default HistoryList
