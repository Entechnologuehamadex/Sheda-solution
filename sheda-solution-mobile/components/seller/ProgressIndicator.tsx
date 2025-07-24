import { View } from "react-native"
import { theme } from "../../styles/theme"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: 4,
            backgroundColor: index < currentStep ? theme.colors.primary : "#E5E5E5",
            marginRight: index < totalSteps - 1 ? 8 : 0,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  )
}
