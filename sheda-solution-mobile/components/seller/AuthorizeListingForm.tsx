import { View, ScrollView, TouchableOpacity, Image } from "react-native"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { InterRegular } from "../Text/InterRegular"
import { theme } from "../../styles/theme"

interface AuthorizeListingFormProps {
  formData: any
  onAuthorize: () => void
  onCancel: () => void
  onUpdate: (data: any) => void
}

export function AuthorizeListingForm({ formData, onAuthorize, onCancel, onUpdate }: AuthorizeListingFormProps) {
  const handleUploadDocument = () => {
    // Document upload logic would go here
    onUpdate({ documentsUploaded: true })
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <InterSemiBold style={{ fontSize: 20, color: theme.colors.text, marginBottom: 30 }}>
            Authorize listing
          </InterSemiBold>

          {/* Property Image */}
          <View
            style={{
              width: "100%",
              height: 200,
              backgroundColor: "#F5F5F5",
              borderRadius: 12,
              marginBottom: 20,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../../assets/images/apt-1.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          {/* Property Details */}
          <InterSemiBold style={{ fontSize: 18, color: theme.colors.text, marginBottom: 8 }}>
            Modern Self-contained apartment
          </InterSemiBold>

          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: "#E5E5E5",
                marginRight: 8,
              }}
            />
            <InterRegular style={{ fontSize: 14, color: theme.colors.textSecondary }}>{formData.location}</InterRegular>
          </View>

          {/* Description */}
          <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Description</InterSemiBold>
          <InterRegular
            style={{
              fontSize: 14,
              color: theme.colors.textSecondary,
              lineHeight: 20,
              marginBottom: 20,
            }}
          >
            This tastefully furnished modern self-contained apartment is located at km 20, lekki-ajah expressway, 5
            minutes drive from moobil filling station.
          </InterRegular>

          {/* Price Details */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E5E5",
            }}
          >
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text }}>Rent/yr</InterSemiBold>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text }}>₦320,000.00</InterSemiBold>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E5E5",
              marginBottom: 30,
            }}
          >
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text }}>Damages</InterSemiBold>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text }}>₦30,000.00</InterSemiBold>
          </View>

          {/* Document Upload */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text }}>Document upload status</InterSemiBold>
            <InterRegular
              style={{
                fontSize: 14,
                color: formData.documentsUploaded ? "#4CAF50" : theme.colors.primary,
              }}
            >
              {formData.documentsUploaded ? "Uploaded" : "Upload"}
            </InterRegular>
          </View>

          {!formData.documentsUploaded && (
            <View style={{ marginBottom: 40 }}>
              <InterRegular
                style={{
                  fontSize: 14,
                  color: theme.colors.textSecondary,
                  marginBottom: 20,
                }}
              >
                Upload property documents here; C of O...
              </InterRegular>

              <TouchableOpacity
                onPress={handleUploadDocument}
                style={{
                  height: 120,
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: "#E5E5E5",
                  borderStyle: "dashed",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingBottom: 30,
          gap: 15,
        }}
      >
        <Button
          title="Cancel"
          onPress={onCancel}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#E5E5E5",
            paddingVertical: 16,
            borderRadius: 8,
          }}
          textStyle={{
            color: theme.colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        />
        <Button
          title={formData.documentsUploaded ? "Authorize" : "Upload documents"}
          onPress={formData.documentsUploaded ? onAuthorize : handleUploadDocument}
          style={{
            flex: 1,
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
