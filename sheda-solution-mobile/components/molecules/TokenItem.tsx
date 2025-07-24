import type React from "react"
import { View, Image } from "react-native"
import InterRegular from "../Text/InterRegular"
import InterMedium from "../Text/InterMedium"
import type { Token } from "../../types/wallet"

interface TokenItemProps {
  token: Token
}

const TokenItem: React.FC<TokenItemProps> = ({ token }) => {
  return (
    <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100">
      <View className="flex-row items-center flex-1">
        <View
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: token.iconColor }}
        >
          <Image source={token.icon} className="w-8 h-8" resizeMode="contain" />
        </View>
        <View>
          <InterMedium className="text-base text-black">{token.name}</InterMedium>
          <InterRegular className="text-sm text-gray-500">${token.price.toFixed(2)}</InterRegular>
        </View>
      </View>
      <View className="items-end">
        <InterMedium className="text-base text-black">{token.amount}</InterMedium>
        <InterRegular className="text-sm text-gray-500">${token.totalValue.toLocaleString()}</InterRegular>
      </View>
    </View>
  )
}

export default TokenItem
