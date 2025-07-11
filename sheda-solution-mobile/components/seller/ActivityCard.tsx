import type React from "react"
import { View } from "react-native"
import InterRegular from "../Text/InterRegular"
import InterMedium from "../Text/InterMedium"

interface ActivityCardProps {
  title: string
  showViewAll?: boolean
  onViewAllPress?: () => void
  children: React.ReactNode
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, showViewAll = false, onViewAllPress, children }) => {
  return (
    <View className="bg-white rounded-lg border border-borderColor p-4 mb-4">
      <View className="flex-row justify-between items-center mb-4">
        <InterMedium className="text-base text-secondaryText">{title}</InterMedium>
        {showViewAll && (
          <InterRegular className="text-primary text-sm" onPress={onViewAllPress}>
            View all
          </InterRegular>
        )}
      </View>
      {children}
    </View>
  )
}

export default ActivityCard
