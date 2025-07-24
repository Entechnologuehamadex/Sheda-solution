"use client"

import { useState } from "react"
import { ScrollView, View, TouchableOpacity } from "react-native"
import ActivityCard from "./ActivityCard"
import DonutChart from "./DonutChart"
import InterSemiBold from "../Text/InterSemiBold"
import InterRegular from "../Text/InterRegular"
import HistoryList from "../history/HistoryList"
import { historyData } from "../../constants/history-data"
import historyHeader from "../../constants/historyHeader"
import Button from "../common/Button"

const SellerActivities = () => {
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0)
  const [activeHistoryItem, setActiveHistoryItem] = useState("Ongoing")

  const revenueData = [
    {
      label: "Total revenue",
      value: "₦17,500,000",
      color: "#C1272D",
      percentage: 40,
    },
    {
      label: "Rent Collected",
      value: "₦7,500,000",
      color: "#00BCD4",
      percentage: 30,
    },
    {
      label: "Pending Rent",
      value: "₦10,000,000",
      color: "#FFC107",
      percentage: 30,
    },
  ]

  const propertiesData = [
    {
      label: "Total Homes",
      value: 24,
      color: "#C1272D",
      percentage: 50,
    },
    {
      label: "Rented Homes",
      value: 14,
      color: "#00BCD4",
      percentage: 29,
    },
    {
      label: "Vacant homes",
      value: 10,
      color: "#FFC107",
      percentage: 21,
    },
  ]

  const handleViewAllRevenue = () => {
    console.log("View all revenue pressed")
    // Navigate to detailed revenue page
  }

  const handleHistoryClick = (index: number, item: string) => {
    setActiveHistoryIndex(index)
    setActiveHistoryItem(item)
  }

  const currentHistoryData = historyData[activeHistoryItem] || []

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      {/* Revenue Card */}
      <ActivityCard title="Revenue" showViewAll={true} onViewAllPress={handleViewAllRevenue}>
        <DonutChart data={revenueData} />
      </ActivityCard>

      {/* Properties Card */}
      <ActivityCard title="Properties">
        <DonutChart data={propertiesData} />
      </ActivityCard>

      {/* History Section */}
      <View className="bg-white rounded-lg p-4 md:p-6 mx-1 mb-10 shadow-sm">
  <InterSemiBold className="text-lg md:text-xl mb-4">History</InterSemiBold>

  {/* History Tabs - responsive layout */}
  <View className="flex flex-row flex-nowrap justify-between gap-2 md:gap-4 mb-4 w-full">
  {historyHeader.map((item, index) => (
    <Button
      key={index}
      color={activeHistoryIndex === index ? "#C1272D" : "#C1272D0A"}
      onPress={() => handleHistoryClick(index, item)}
      className="flex-1 shrink-0 rounded-lg px-2 sm:px-3 py-2"
    >
      <InterRegular
        className={`text-center text-xs sm:text-sm ${
          activeHistoryIndex === index ? "text-white" : "text-secondaryText"
        } whitespace-nowrap`}
      >
        {item}
      </InterRegular>
    </Button>
  ))}
</View>



  {/* History Content */}
  <View className="mt-4">
    {currentHistoryData.length > 0 ? (
      <HistoryList histories={currentHistoryData} historyType={activeHistoryItem} />
    ) : (
      <View className="py-8 items-center">
        <InterRegular className="text-secondaryText text-center">
          No {activeHistoryItem.toLowerCase()} history
        </InterRegular>
      </View>
    )}
  </View>
</View>

    </ScrollView>
  )
}

export default SellerActivities
