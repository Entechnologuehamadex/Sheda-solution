"use client"

import type React from "react"
import { View, ScrollView, TouchableOpacity } from "react-native"
import { useState } from "react"
import { router } from "expo-router"
import BackBtn from "../common/BackBtn"
import InterSemiBold from "../Text/InterSemiBold"
import InterRegular from "../Text/InterRegular"
import Button from "../common/Button"
import SelectInput from "../input/selectInput"
import Checkbox from "../input/checkbox"
import StyledTextInput from "../input/textInput"
import PhotoUpload from "./PhotoUpload"
import ProgressBar from "./ProgressBar"
import Icon from "../common/Icon"
import { SUCCESSFUL } from "@/assets/icons"

interface PropertyData {
  propertyType: string
  status: string
  location: string
  furnishing: string
  bedrooms: number
  bathrooms: number
  extras: string[]
  photos: string[]
  description: string
  price: string
  isNegotiable: boolean
  rentPerYear: string
  damages: string
}

const PropertyListingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyType: "",
    status: "",
    location: "",
    furnishing: "",
    bedrooms: 1,
    bathrooms: 1,
    extras: [],
    photos: [],
    description: "",
    price: "",
    isNegotiable: false,
    rentPerYear: "",
    damages: "",
  })

  const propertyTypes = [
    { label: "Apartment", value: "apartment" },
    { label: "Bungalow", value: "bungalow" },
    { label: "Duplex", value: "duplex" },
  ]

  const statusOptions = [
    { label: "For rent", value: "rent" },
    { label: "For sale", value: "sale" },
  ]

  const locationOptions = [
    { label: "Lekki, Lagos", value: "lekki" },
    { label: "Victoria Island, Lagos", value: "victoria-island" },
    { label: "Ikoyi, Lagos", value: "ikoyi" },
  ]

  const furnishingOptions = [
    { label: "Furnished", value: "furnished" },
    { label: "Unfurnished", value: "unfurnished" },
    { label: "Semi-furnished", value: "semi-furnished" },
  ]

  const bedroomOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ]

  const bathroomOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
  ]

  const extrasOptions = [
    "Air conditioner",
    "Pop Ceiling",
    "Floor Tiles",
    "Running water",
    "Furniture",
    "Prepaid meter",
    "Wi-Fi",
  ]

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleExtraChange = (extra: string, checked: boolean) => {
    if (checked) {
      setPropertyData({ ...propertyData, extras: [...propertyData.extras, extra] })
    } else {
      setPropertyData({ ...propertyData, extras: propertyData.extras.filter((e) => e !== extra) })
    }
  }

  const handleSubmit = () => {
    console.log("Property data:", propertyData)
    setCurrentStep(8)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Landing page
        return (
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}
            >
              <InterSemiBold className="text-lg">List a property</InterSemiBold>
              <TouchableOpacity onPress={() => router.push("/(tabs)/history")}>
                <InterRegular className="text-primary">History</InterRegular>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 32 }}>
              <InterRegular className="text-base mb-6">Property listing made easy in 4 easy steps.</InterRegular>

              <View>
                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#C1272D",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 16,
                      marginTop: 4,
                    }}
                  >
                    <InterRegular className="text-white text-xs">1</InterRegular>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InterSemiBold className="text-base mb-1">Describe your property</InterSemiBold>
                    <InterRegular className="text-secondaryText text-sm">
                      Fill in the necessary information that best describes your property
                    </InterRegular>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#C1272D",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 16,
                      marginTop: 4,
                    }}
                  >
                    <InterRegular className="text-white text-xs">2</InterRegular>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InterSemiBold className="text-base mb-1">Add extras</InterSemiBold>
                    <InterRegular className="text-secondaryText text-sm">
                      Tick the amenities that make your property standout amidst others
                    </InterRegular>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#C1272D",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 16,
                      marginTop: 4,
                    }}
                  >
                    <InterRegular className="text-white text-xs">3</InterRegular>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InterSemiBold className="text-base mb-1">Upload quality photos</InterSemiBold>
                    <InterRegular className="text-secondaryText text-sm">
                      Add photos/videos of your properties, showing the selling point, and include a short concise
                      description.
                    </InterRegular>
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 16 }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#C1272D",
                      borderRadius: 12,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 16,
                      marginTop: 4,
                    }}
                  >
                    <InterRegular className="text-white text-xs">4</InterRegular>
                  </View>
                  <View style={{ flex: 1 }}>
                    <InterSemiBold className="text-base mb-1">Set your price and list</InterSemiBold>
                    <InterRegular className="text-secondaryText text-sm">
                      Here, you set the cost price of your property and you proceed to approve your listing request.
                    </InterRegular>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 32 }}>
              <Button className="rounded-lg" onPress={handleNext}>
                <InterSemiBold className="text-white">Get started</InterSemiBold>
              </Button>
            </View>
          </View>
        )

      case 1: // Property details
        return (
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <SelectInput
              label="Property type"
              options={propertyTypes}
              value={propertyData.propertyType}
              onValueChange={(value) => setPropertyData({ ...propertyData, propertyType: value as string })}
              placeholder="Apartment"
            />
            <SelectInput
              label="Status"
              options={statusOptions}
              value={propertyData.status}
              onValueChange={(value) => setPropertyData({ ...propertyData, status: value as string })}
              placeholder="For rent"
            />
            <SelectInput
              label="Location"
              options={locationOptions}
              value={propertyData.location}
              onValueChange={(value) => setPropertyData({ ...propertyData, location: value as string })}
              placeholder="Lekki, Lagos"
            />
            <SelectInput
              label="Furnishing"
              options={furnishingOptions}
              value={propertyData.furnishing}
              onValueChange={(value) => setPropertyData({ ...propertyData, furnishing: value as string })}
              placeholder="Unfurnished"
            />
            <SelectInput
              label="Bedrooms"
              options={bedroomOptions}
              value={propertyData.bedrooms}
              onValueChange={(value) => setPropertyData({ ...propertyData, bedrooms: value as number })}
            />
            <SelectInput
              label="Bathrooms"
              options={bathroomOptions}
              value={propertyData.bathrooms}
              onValueChange={(value) => setPropertyData({ ...propertyData, bathrooms: value as number })}
            />
          </View>
        )

      case 2: // Property extras
        return (
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <InterRegular className="text-base mb-4">Property extras</InterRegular>
            {extrasOptions.map((extra) => (
              <Checkbox
                key={extra}
                label={extra}
                value={propertyData.extras.includes(extra)}
                onChange={(checked) => handleExtraChange(extra, checked)}
              />
            ))}
          </View>
        )

      case 3: // Photos
        return (
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <PhotoUpload
              photos={propertyData.photos}
              onPhotosChange={(photos) => setPropertyData({ ...propertyData, photos })}
            />
          </View>
        )

      case 4: // Description and price
        return (
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <View style={{ marginBottom: 16 }}>
              <InterRegular className="text-base mb-2">Add a description</InterRegular>
              <StyledTextInput
                placeholder="Your description goes here..."
                multiline
                numberOfLines={6}
                value={propertyData.description}
                onChangeText={(text) => setPropertyData({ ...propertyData, description: text })}
                style={{ height: 120, textAlignVertical: "top" }}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <InterRegular className="text-base mb-2">Set Price</InterRegular>
              <StyledTextInput
                placeholder="500,000"
                value={propertyData.price}
                onChangeText={(text) => setPropertyData({ ...propertyData, price: text })}
                keyboardType="numeric"
              />
            </View>

            <Checkbox
              label="Is this price negotiable?"
              value={propertyData.isNegotiable}
              onChange={(checked) => setPropertyData({ ...propertyData, isNegotiable: checked })}
            />
          </View>
        )

      case 8: // Success
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 16 }}>
            <View
              style={{
                width: 96,
                height: 96,
                backgroundColor: "#E8F5E8",
                borderRadius: 48,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Icon icon={SUCCESSFUL} width={35} height={35} />
            </View>

            <InterSemiBold className="text-lg mb-2 text-center">Listing successful</InterSemiBold>
            <InterRegular className="text-secondaryText text-center mb-8" style={{ paddingHorizontal: 16 }}>
              Your property has been successfully listed on our marketplace, you will get notified whenever you have a
              potential buyer. Cheers!
            </InterRegular>

            <Button className="rounded-lg w-full" onPress={() => router.push("/(tabs)/home")}>
              <InterSemiBold className="text-white">Go to homepage</InterSemiBold>
            </Button>
          </View>
        )

      default:
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <InterRegular className="text-secondaryText">Loading...</InterRegular>
          </View>
        )
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {currentStep > 0 && currentStep < 8 && (
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16, paddingHorizontal: 16 }}>
          <BackBtn />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <InterSemiBold className="text-lg">List a property</InterSemiBold>
          </View>
        </View>
      )}

      {currentStep > 0 && currentStep < 5 && (
        <View style={{ paddingHorizontal: 16 }}>
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      >
        {renderStepContent()}
      </ScrollView>

      {currentStep > 0 && currentStep < 5 && (
        <View style={{ marginTop: 24, paddingHorizontal: 16, paddingBottom: 16 }}>
          <Button className="rounded-lg" onPress={handleNext}>
            <InterSemiBold className="text-white">{currentStep === 4 ? "Confirm and list" : "Next"}</InterSemiBold>
          </Button>
        </View>
      )}
    </View>
  )
}

export default PropertyListingForm
