import { View, ScrollView, TouchableOpacity } from "react-native"
import { BackBtn } from "../common/BackBtn"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { InterRegular } from "../Text/InterRegular"
import { ProgressIndicator } from "./ProgressIndicator"
import { theme } from "../../styles/theme"

interface PhotoUploadFormProps {
  formData: any
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export function PhotoUploadForm({ formData, onNext, onBack, onUpdate }: PhotoUploadFormProps) {
  const handleAddPhoto = () => {
    // Photo picker logic would go here
    console.log("Add photo")
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
        <ProgressIndicator currentStep={3} totalSteps={4} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 30 }}>
            Add at least 4 photos
          </InterSemiBold>

          {/* Photo Grid */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            {[1, 2, 3, 4].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={handleAddPhoto}
                style={{
                  width: "48%",
                  aspectRatio: 1,
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 2,
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                  <View
                    style={{
                      width: 2,
                      height: 20,
                      backgroundColor: theme.colors.primary,
                      position: "absolute",
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add More Button */}
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 15,
            }}
          >
            <InterRegular style={{ fontSize: 16, color: theme.colors.text }}>Add more</InterRegular>
            <View
              style={{
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: theme.colors.primary,
                }}
              />
              <View
                style={{
                  width: 2,
                  height: 12,
                  backgroundColor: theme.colors.primary,
                  position: "absolute",
                }}
              />
            </View>
          </TouchableOpacity>
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
