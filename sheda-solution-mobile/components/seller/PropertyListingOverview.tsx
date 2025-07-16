import { View, TouchableOpacity, ScrollView } from "react-native"
import InterSemiBold from "../Text/InterSemiBold"
import InterRegular from "../Text/InterRegular"
import Button from "../common/Button"
import { ProgressIndicator } from "./ProgressIndicator"
import { theme } from "../../styles/theme"

interface PropertyListingOverviewProps {
  onGetStarted: () => void
  onHistoryPress: () => void
}

export function PropertyListingOverview({ onGetStarted, onHistoryPress }: PropertyListingOverviewProps) {
  const steps = [
    {
      number: 1,
      title: "Describe your property",
      description: "Fill in the necessary information that best describes your property",
    },
    {
      number: 2,
      title: "Add extras",
      description: "Tick the amenities that make your property standout amidst others",
    },
    {
      number: 3,
      title: "Upload quality photos",
      description:
        "Add photos/videos of your properties,showing the selling point, and include a short concise description.",
    },
    {
      number: 4,
      title: "Set your price and list",
      description: "Here, you set the cost price of your property and you proceed to approve your listing request.",
    },
  ]

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
    <View className="px-5 pt-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-[30px]">
        <InterSemiBold className="text-[20px]" style={{ color: theme.colors.text }}>
          List a property
        </InterSemiBold>
        <TouchableOpacity onPress={onHistoryPress}>
          <View className="flex-row items-center">
            <View
              className="w-5 h-5 rounded-full border-2 mr-2 justify-center items-center"
              style={{ borderColor: theme.colors.primary }}
            >
              <View
                className="w-3 h-3 rounded-full border"
                style={{
                  borderColor: theme.colors.primary,
                  backgroundColor: "transparent",
                }}
              />
            </View>
            <InterRegular className="text-[16px]" style={{ color: theme.colors.primary }}>
              History
            </InterRegular>
          </View>
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={0} totalSteps={4} />

      {/* Description */}
      <View className="mb-[40px] mt-[40px] pb-5">
        <InterRegular className="text-[16px]" style={{ color: theme.colors.text }}>
          Property listing made easy in 4 easy steps.
        </InterRegular>
      </View>

      {/* Steps */}
      <View className="mb-[40px] mt-[40px] pt-5">
        {steps.map((step) => (
          <View key={step.number} className="mb-[30px]">
            <View className="flex-row items-start">
              <View
                className="w-8 h-8 rounded-full justify-center items-center mr-[15px]"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <InterSemiBold className="text-[16px] text-white">{step.number}</InterSemiBold>
              </View>
              <View className="flex-1">
                <InterSemiBold className="text-[16px] mb-2" style={{ color: theme.colors.text }}>
                  {step.title}
                </InterSemiBold>
                <InterRegular className="text-[14px] leading-5" style={{ color: theme.colors.secondaryText }}>
                  {step.description}
                </InterRegular>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Get Started Button */}
      <View className="mb-[30px]">
        <Button
          title="Get started"
          onPress={onGetStarted}
          className="bg-primary py-4 rounded-lg"
          textStyle="text-white text-[16px] font-semibold"
        />
      </View>
    </View>
  </ScrollView>  )
}
