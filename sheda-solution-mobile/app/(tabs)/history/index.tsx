"use client"

import { View, SafeAreaView, ScrollView } from "react-native"
import InterSemiBold from "@/components/Text/InterSemiBold"
import Button from "@/components/common/Button"
import historyHeader from "../../../constants/historyHeader"
import InterRegular from "@/components/Text/InterRegular"
import { useEffect, useState } from "react"
import { NoHistory } from "@/components/history/NoHistory"
import { historyData } from "../../../constants/history-data"
import type { HouseProps, CancelledHistory } from "@/types"
import HistoryList from "../../../components/history/HistoryList"
import PropertyListingForm from "@/components/seller/PropertyListingForm"
import { useMode } from "@/contexts/ModeContext"

type HistoryType = "Ongoing" | "Active" | "Cancelled" | "Expired"

const History = () => {
  const { isSeller } = useMode()
  const [activeIndex, setIsActiveIndex] = useState<number>(0)
  const [activeItem, setActiveItem] = useState<HistoryType>("Ongoing")
  const [history, setHistory] = useState<(HouseProps | CancelledHistory)[]>([])
  const [isLoading, setLoading] = useState(false)

  const handleHistoryClick = (index: number, item: string) => {
    setIsActiveIndex(index)
    setActiveItem(item as HistoryType)
  }

  useEffect(() => {
    if (!isSeller && activeItem) {
      const fetchHistory = async () => {
        setLoading(true)
        try {
          // Simulate async operation with a small delay
          await new Promise((resolve) => setTimeout(resolve, 100))

          const data = historyData[activeItem]
          if (data && Array.isArray(data)) {
            // Type assertion to ensure compatibility
            setHistory(data as (HouseProps | CancelledHistory)[])
          } else {
            setHistory([])
          }
        } catch (error) {
          console.error("Error fetching history:", error)
          setHistory([])
        } finally {
          setLoading(false)
        }
      }

      fetchHistory()
    }
  }, [activeItem, isSeller])

  // Render seller listing form when in seller mode
  if (isSeller) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="container flex-1 mx-auto max-w-2xl" style={{ padding: 20 }}>
          <PropertyListingForm />
        </View>
      </SafeAreaView>
    )
  }

  // Render buyer history when in buyer mode
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="container flex-1 mx-auto max-w-2xl" style={{ padding: 20 }}>
        <View className="">
          <InterSemiBold className="text-lg/5">History</InterSemiBold>
        </View>

        {/* Header buttons - keeping original design */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          <View className="flex-row gap-2">
            {historyHeader.map((item, index) => (
              <Button
                key={index}
                color={activeIndex === index ? "#C1272D" : "#C1272D0A"}
                onPress={() => handleHistoryClick(index, item)}
                className="rounded-lg px-4 py-2"
                isFull={false}
              >
                <InterRegular className={activeIndex === index ? "text-white" : "text-secondaryText"}>
                  {item}
                </InterRegular>
              </Button>
            ))}
          </View>
        </ScrollView>

        {/* History List */}
        <View className="flex-1 mt-4">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <InterRegular className="text-secondaryText">Loading...</InterRegular>
            </View>
          ) : history.length === 0 ? (
            <NoHistory headText={activeItem} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <HistoryList histories={history} historyType={activeItem} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default History
