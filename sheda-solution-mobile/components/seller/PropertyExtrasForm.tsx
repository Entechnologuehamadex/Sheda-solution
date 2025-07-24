import { View, ScrollView } from "react-native"
import { BackBtn } from "../common/BackBtn"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { CheckBox } from "../input/checkbox"
import { ProgressIndicator } from "./ProgressIndicator"
import { theme } from "../../styles/theme"

interface PropertyExtrasFormProps {
  formData: any
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export function PropertyExtrasForm({ formData, onNext, onBack, onUpdate }: PropertyExtrasFormProps) {
  const extras = [
    "Air conditioner",
    "Pop Ceiling",
    "Floor Tiles",
    "Running water",
    "Furniture",
    "Prepaid meter",
    "Wi-Fi",
  ]

  const handleExtraToggle = (extra: string) => {
    const currentExtras = formData.extras || []
    const updatedExtras = currentExtras.includes(extra)
      ? currentExtras.filter((item: string) => item !== extra)
      : [...currentExtras, extra]

    onUpdate({ extras: updatedExtras })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <BackBtn onPress={onBack} />
          <View style={{ marginLeft: 15 }}>
            <InterSemiBold style={{ fontSize: 18, color: theme.colors.text }}>List a property</InterSemiBold>
          </View>
        </View>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={2} totalSteps={4} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 30 }}>
            Property extras
          </InterSemiBold>

          {extras.map((extra, index) => (
            <View key={index} style={{ marginBottom: 25 }}>
              <CheckBox
                label={extra}
                checked={formData.extras?.includes(extra) || false}
                onPress={() => handleExtraToggle(extra)}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <Button
          title="Next"
          onPress={onNext}
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: 16,
            borderRadius: 8,
          }}
          textStyle={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        />
      </View>
    </View>
  )
}
