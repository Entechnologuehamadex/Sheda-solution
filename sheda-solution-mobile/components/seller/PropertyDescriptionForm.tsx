"use client"
import { View, ScrollView } from "react-native"
import { BackBtn } from "../common/BackBtn"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { SelectInput } from "../input/selectInput"
import { ProgressIndicator } from "./ProgressIndicator"
import { theme } from "../../styles/theme"

interface PropertyDescriptionFormProps {
  formData: any
  onNext: () => void
  onBack: () => void
  onUpdate: (data: any) => void
}

export function PropertyDescriptionForm({ formData, onNext, onBack, onUpdate }: PropertyDescriptionFormProps) {
  const propertyTypes = [
    { label: "Apartment", value: "Apartment" },
    { label: "House", value: "House" },
    { label: "Office", value: "Office" },
    { label: "Shop", value: "Shop" },
  ]

  const statusOptions = [
    { label: "For rent", value: "For rent" },
    { label: "For sale", value: "For sale" },
  ]

  const locations = [
    { label: "Lekki, Lagos", value: "Lekki, Lagos" },
    { label: "Victoria Island, Lagos", value: "Victoria Island, Lagos" },
    { label: "Ikeja, Lagos", value: "Ikeja, Lagos" },
    { label: "Abuja", value: "Abuja" },
  ]

  const furnishingOptions = [
    { label: "Unfurnished", value: "Unfurnished" },
    { label: "Semi-furnished", value: "Semi-furnished" },
    { label: "Fully furnished", value: "Fully furnished" },
  ]

  const bedroomOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5+", value: "5+" },
  ]

  const bathroomOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5+", value: "5+" },
  ]

  const handleNext = () => {
    onNext()
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
        <ProgressIndicator currentStep={1} totalSteps={4} />
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          {/* Property Type */}
          <View style={{ marginBottom: 20 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>
              Property type
            </InterSemiBold>
            <SelectInput
              value={formData.propertyType}
              options={propertyTypes}
              onSelect={(value) => onUpdate({ propertyType: value })}
              placeholder="Select property type"
            />
          </View>

          {/* Status */}
          <View style={{ marginBottom: 20 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Status</InterSemiBold>
            <SelectInput
              value={formData.status}
              options={statusOptions}
              onSelect={(value) => onUpdate({ status: value })}
              placeholder="Select status"
            />
          </View>

          {/* Location */}
          <View style={{ marginBottom: 20 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Location</InterSemiBold>
            <SelectInput
              value={formData.location}
              options={locations}
              onSelect={(value) => onUpdate({ location: value })}
              placeholder="Select location"
            />
          </View>

          {/* Furnishing */}
          <View style={{ marginBottom: 20 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>
              Furnishing
            </InterSemiBold>
            <SelectInput
              value={formData.furnishing}
              options={furnishingOptions}
              onSelect={(value) => onUpdate({ furnishing: value })}
              placeholder="Select furnishing"
            />
          </View>

          {/* Bedrooms */}
          <View style={{ marginBottom: 20 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Bedrooms</InterSemiBold>
            <SelectInput
              value={formData.bedrooms}
              options={bedroomOptions}
              onSelect={(value) => onUpdate({ bedrooms: value })}
              placeholder="Select bedrooms"
            />
          </View>

          {/* Bathrooms */}
          <View style={{ marginBottom: 40 }}>
            <InterSemiBold style={{ fontSize: 16, color: theme.colors.text, marginBottom: 8 }}>Bathrooms</InterSemiBold>
            <SelectInput
              value={formData.bathrooms}
              options={bathroomOptions}
              onSelect={(value) => onUpdate({ bathrooms: value })}
              placeholder="Select bathrooms"
            />
          </View>
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        <Button
          title="Next"
          onPress={handleNext}
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
