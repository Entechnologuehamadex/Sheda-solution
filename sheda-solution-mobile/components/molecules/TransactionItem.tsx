import type React from "react"
import { View, Image } from "react-native"
import InterRegular from "../Text/InterRegular"
import InterMedium from "../Text/InterMedium"
import type { Transaction } from "../../types/wallet"

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isIncoming = transaction.direction === "incoming"

  return (
    <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
          <Image
            source={
              isIncoming
                ? require("../../assets/images/incoming-arrow.png")
                : require("../../assets/images/outgoing-arrow.png")
            }
            className="w-5 h-5"
            resizeMode="contain"
          />
        </View>
        <View>
          <InterMedium className="text-base text-black">{transaction.type}</InterMedium>
          <InterRegular className="text-sm text-gray-500">
            {isIncoming ? `From: ${transaction.from}` : `To: ${transaction.to}`}
          </InterRegular>
        </View>
      </View>
      <View className="items-end">
        <InterMedium className="text-base text-black">
          {transaction.amount} {transaction.currency}
        </InterMedium>
        <InterRegular className="text-sm text-gray-500">${transaction.value}</InterRegular>
      </View>
    </View>
  )
}

export default TransactionItem
