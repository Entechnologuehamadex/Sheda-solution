import { View, ScrollView, TextInput } from "react-native"
import { BackBtn } from "../common/BackBtn"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { CheckBox } from "../input/checkbox"
import { ProgressIndicator } from "./ProgressIndicator"
import { theme } from "../../styles/theme"

interface PriceDescriptionFormProps {
  formData: any
  onConfirm: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export function PriceDescriptionForm({ formData, onConfirm, onBack, onUpdate }: PriceDescriptionFormProps) {
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
        <ProgressIndicator currentStep={4} totalSteps={4} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          {/* Description */}
          <View style={{ marginBottom: 30 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>
              Add a description
            </InterSemiBold>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E5E5E5",
                borderRadius: 8,
                padding: 15,
                height: 120,
                textAlignVertical: "top",
                fontSize: 16,
                color: theme.colors.text,
              }}
              placeholder="Your description goes here..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              value={formData.description}
              onChangeText={(text) => onUpdate({ description: text })}
            />
          </View>

          {/* Price */}
          <View style={{ marginBottom: 30 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Set Price</InterSemiBold>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E5E5E5",
                borderRadius: 8,
                padding: 15,
                fontSize: 16,
                color: theme.colors.text,
              }}
              placeholder="500,000"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => onUpdate({ price: text })}
            />
          </View>

          {/* Negotiable Checkbox */}
          <View style={{ marginBottom: 40 }}>
            <CheckBox
              label="Is this price negotiable?"
              checked={formData.isNegotiable}
              onPress={() => onUpdate({ isNegotiable: !formData.isNegotiable })}
            />
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <Button
          title="Confirm and list"
          onPress={onConfirm}
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
