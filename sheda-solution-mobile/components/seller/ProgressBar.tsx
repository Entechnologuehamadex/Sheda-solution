import type React from "react"
import { View } from "react-native"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <View className="flex-row mb-6">
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} className="flex-1 mx-1">
          <View className={`h-1 rounded-full ${index < currentStep ? "bg-primary" : "bg-gray-300"}`} />
        </View>
      ))}
    </View>
  )
}

export default ProgressBar
