import type React from "react"
import { TouchableOpacity, View } from "react-native"
import InterRegular from "../Text/InterRegular"

interface TabButtonProps {
  title: string
  isActive: boolean
  onPress: () => void
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-1 py-0 pb-0">
      <View className="items-center">
        <InterRegular className={`text-base ${isActive ? "text-black" : "text-gray-500"}`}>{title}</InterRegular>
        {isActive && <View className="w-full h-0.5 bg-red-500 mt-2" />}
      </View>
    </TouchableOpacity>
  )
}

export default TabButton
