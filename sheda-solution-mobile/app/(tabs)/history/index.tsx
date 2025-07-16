"use client"

import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native"
import InterSemiBold from "@/components/Text/InterSemiBold"
import Button from "@/components/common/Button"
import historyHeader from "../../../constants/historyHeader"
import InterRegular from "@/components/Text/InterRegular"
import { useEffect, useState } from "react"
import { NoHistory } from "@/components/history/NoHistory"
import { historyData } from "../../../constants/history-data"
import type { HouseProps, CancelledHistory } from "@/types"
import HistoryList from "../../../components/history/HistoryList"
import { useMode } from "@/contexts/ModeContext"
import BackBtn from "@/components/common/BackBtn"
import Icon from "@/components/common/Icon"
import { HISTORYICON } from "@/assets/icons"
import { router } from "expo-router"

const History = () => {
  const { isSeller, toggleMode } = useMode()
  const [activeIndex, setIsActiveIndex] = useState<null | number>(0)
  const [activeItem, setActiveItem] = useState<null | any>("Ongoing")
  const [history, setHistory] = useState<(HouseProps | CancelledHistory)[] | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    propertyType: "Apartment",
    status: "For rent",
    location: "Lekki, Lagos",
    furnishing: "Unfurnished",
    bedrooms: "1",
    bathrooms: "1",
    extras: [] as string[],
    photos: [] as string[],
    description: "",
    price: "",
    isNegotiable: false,
    documentsUploaded: false,
  })

  const handleHistoryClick = (index: number, item: string) => {
    setIsActiveIndex(index)
    setActiveItem(item)
  }

  const handleHistoryPress = () => {
    setShowHistory(true)
  }

  const handleBackFromHistory = () => {
    setShowHistory(false)
  }

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormDataUpdate = (data: any) => {
    setFormData({ ...formData, ...data })
  }

  const handleGetStarted = () => {
    setCurrentStep(1)
  }

  const handleConfirmListing = () => {
    setCurrentStep(5)
  }

  const handleAuthorize = () => {
    setCurrentStep(6)
  }

  const handleGoToHomepage = () => {
    router.push("/(tabs)/home")
    setCurrentStep(0)
  }

  useEffect(() => {
    const fetchHistory = () => {
      setLoading(true)
      try {
        const data = historyData[activeItem]
        setHistory(data)
      } catch (error) {
        console.error("Error fetching history:", error)
        setHistory(null)
      } finally {
        setLoading(false)
      }
    }

    if (!isSeller) {
      fetchHistory()
    }
  }, [activeItem, isSeller])

  // Render History Button for Seller Mode
  const renderHistoryButton = () => (
    <TouchableOpacity
      onPress={handleHistoryPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#FFF5F5",
      }}
    >
      <Icon icon={HISTORYICON} width={16} height={16} />
      <InterRegular style={{ marginLeft: 8, color: "#C1272D", fontSize: 14 }}>History</InterRegular>
    </TouchableOpacity>
  )

  // Progress Indicator Component
  const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 20 }}>
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={{
            flex: 1,
            height: 4,
            backgroundColor: step <= currentStep ? "#C1272D" : "#E5E5E5",
            marginHorizontal: 2,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  )

  // Property Listing Overview
  const PropertyListingOverview = () => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <InterSemiBold style={{ fontSize: 18, color: "#000" }}>List a property</InterSemiBold>
        {renderHistoryButton()}
      </View>

      <ProgressIndicator currentStep={0} />

      <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 30 }}>
        Property listing made easy in 4 easy steps.
      </InterRegular>

      <View style={{ marginBottom: 40 }}>
        {[
          {
            step: 1,
            title: "Describe your property",
            description: "Fill in the necessary information that best describes your property",
          },
          {
            step: 2,
            title: "Add extras",
            description: "Tick the amenities that make your property standout amidst others",
          },
          {
            step: 3,
            title: "Upload quality photos",
            description:
              "Add photos/videos of your properties,showing the selling point, and include a short concise description.",
          },
          {
            step: 4,
            title: "Set your price and list",
            description:
              "Here, you set the cost price of your property and you proceed to approve your listing request.",
          },
        ].map((item) => (
          <View key={item.step} style={{ flexDirection: "row", marginBottom: 30 }}>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "#C1272D",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 15,
                marginTop: 2,
              }}
            >
              <InterRegular style={{ color: "#FFF", fontSize: 12, fontWeight: "600" }}>{item.step}</InterRegular>
            </View>
            <View style={{ flex: 1 }}>
              <InterSemiBold style={{ fontSize: 16, color: "#000", marginBottom: 8 }}>{item.title}</InterSemiBold>
              <InterRegular style={{ fontSize: 14, color: "#666", lineHeight: 20 }}>{item.description}</InterRegular>
            </View>
          </View>
        ))}
      </View>

      <Button
        onPress={handleGetStarted}
        style={{
          backgroundColor: "#C1272D",
          paddingVertical: 16,
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <InterSemiBold style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>Get started</InterSemiBold>
      </Button>
    </ScrollView>
  )

  // Property Description Form (Step 1)
  const PropertyDescriptionForm = () => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <BackBtn onPress={handlePrevStep} />
        <InterSemiBold style={{ fontSize: 18, color: "#000", marginLeft: 15 }}>List a property</InterSemiBold>
      </View>

      <ProgressIndicator currentStep={1} />

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Property type</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.propertyType}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Status</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.status}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Location</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.location}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Furnishing</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.furnishing}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Bedrooms</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.bedrooms}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Bathrooms</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>{formData.bathrooms}</InterRegular>
          <Text style={{ fontSize: 16, color: "#666" }}>▼</Text>
        </View>
      </View>

      <Button
        onPress={handleNextStep}
        style={{
          backgroundColor: "#C1272D",
          paddingVertical: 16,
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <InterSemiBold style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>Next</InterSemiBold>
      </Button>
    </ScrollView>
  )

  // Property Extras Form (Step 2)
  const PropertyExtrasForm = () => {
    const extras = [
      "Air conditioner",
      "Pop Ceiling",
      "Floor Tiles",
      "Running water",
      "Furniture",
      "Prepaid meter",
      "Wi-Fi",
    ]

    return (
      <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <BackBtn onPress={handlePrevStep} />
          <InterSemiBold style={{ fontSize: 18, color: "#000", marginLeft: 15 }}>List a property</InterSemiBold>
        </View>

        <ProgressIndicator currentStep={2} />

        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 30 }}>Property extras</InterRegular>

        <View style={{ marginBottom: 40 }}>
          {extras.map((extra, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 15,
                borderBottomWidth: index < extras.length - 1 ? 1 : 0,
                borderBottomColor: "#F0F0F0",
              }}
            >
              <InterRegular style={{ fontSize: 16, color: "#000" }}>{extra}</InterRegular>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderWidth: 1,
                  borderColor: "#E5E5E5",
                  borderRadius: 4,
                  backgroundColor: formData.extras.includes(extra) ? "#C1272D" : "#FFF",
                }}
              />
            </View>
          ))}
        </View>

        <Button
          onPress={handleNextStep}
          style={{
            backgroundColor: "#C1272D",
            paddingVertical: 16,
            borderRadius: 8,
            marginBottom: 40,
          }}
        >
          <InterSemiBold style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>Next</InterSemiBold>
        </Button>
      </ScrollView>
    )
  }

  // Photo Upload Form (Step 3)
  const PhotoUploadForm = () => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <BackBtn onPress={handlePrevStep} />
        <InterSemiBold style={{ fontSize: 18, color: "#000", marginLeft: 15 }}>List a property</InterSemiBold>
      </View>

      <ProgressIndicator currentStep={3} />

      <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 30 }}>Add at least 4 photos</InterRegular>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 30 }}>
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={{
              width: "48%",
              aspectRatio: 1,
              backgroundColor: "#F8F8F8",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 24, color: "#C1272D" }}>+</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 15,
          marginBottom: 40,
        }}
      >
        <InterRegular style={{ fontSize: 16, color: "#000" }}>Add more</InterRegular>
        <Text style={{ fontSize: 20, color: "#C1272D" }}>+</Text>
      </TouchableOpacity>

      <Button
        onPress={handleNextStep}
        style={{
          backgroundColor: "#C1272D",
          paddingVertical: 16,
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <InterSemiBold style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>Next</InterSemiBold>
      </Button>
    </ScrollView>
  )

  // Price Description Form (Step 4)
  const PriceDescriptionForm = () => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <BackBtn onPress={handlePrevStep} />
        <InterSemiBold style={{ fontSize: 18, color: "#000", marginLeft: 15 }}>List a property</InterSemiBold>
      </View>

      <ProgressIndicator currentStep={4} />

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Add a description</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            height: 120,
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#999" }}>Your description goes here...</InterRegular>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <InterRegular style={{ fontSize: 16, color: "#000", marginBottom: 15 }}>Set Price</InterRegular>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
          }}
        >
          <InterRegular style={{ fontSize: 16, color: "#000" }}>500,000</InterRegular>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "#E5E5E5",
            borderRadius: 4,
            marginRight: 12,
          }}
        />
        <InterRegular style={{ fontSize: 16, color: "#000" }}>Is this price negotiable?</InterRegular>
      </View>

      <Button
        onPress={handleConfirmListing}
        style={{
          backgroundColor: "#C1272D",
          paddingVertical: 16,
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <InterSemiBold style={{ color: "#FFF", fontSize: 16, textAlign: "center" }}>Confirm and list</InterSemiBold>
      </Button>
    </ScrollView>
  )

  // Authorize Listing Form (Step 5)
  const AuthorizeListingForm = () => (
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <InterSemiBold style={{ fontSize: 18, color: "#000", marginBottom: 30 }}>Authorize listing</InterSemiBold>

      <View
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 8,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <View style={{ height: 150, backgroundColor: "#E5E5E5" }} />
      </View>

      <InterSemiBold style={{ fontSize: 16, color: "#000", marginBottom: 8 }}>
        Modern Self-contained apartment
      </InterSemiBold>
      <InterRegular style={{ fontSize: 14, color: "#666", marginBottom: 20 }}>📍 Lekki, Lagos</InterRegular>

      <InterSemiBold style={{ fontSize: 16, color: "#000", marginBottom: 8 }}>Description</InterSemiBold>
      <InterRegular style={{ fontSize: 14, color: "#666", marginBottom: 20, lineHeight: 20 }}>
        This tastefully furnished modern self-contained apartment is located at km 20, lekki-ajah expressway, 5 minutes
        drive from moobil filling station.
      </InterRegular>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <InterSemiBold style={{ fontSize: 16, color: "#000" }}>Rent/yr</InterSemiBold>
        <InterSemiBold style={{ fontSize: 16, color: "#000" }}>N320,000.00</InterSemiBold>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <InterSemiBold style={{ fontSize: 16, color: "#000" }}>Damages</InterSemiBold>
        <InterSemiBold style={{ fontSize: 16, color: "#000" }}>N30,000.00</InterSemiBold>
      </View>

      <View style={{ height: 1, backgroundColor: "#E5E5E5", marginBottom: 20 }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 30 }}>
        <InterSemiBold style={{ fontSize: 16, color: "#000" }}>Document upload status</InterSemiBold>
        <InterSemiBold style={{ fontSize: 16, color: "#C1272D" }}>Uploaded</InterSemiBold>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 40 }}>
        <Button
          onPress={handlePrevStep}
          style={{
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#E5E5E5",
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 8,
          }}
        >
          <InterSemiBold style={{ color: "#000", fontSize: 16 }}>Cancel</InterSemiBold>
        </Button>

        <Button
          onPress={handleAuthorize}
          style={{
            backgroundColor: "#C1272D",
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 8,
          }}
        >
          <InterSemiBold style={{ color: "#FFF", fontSize: 16 }}>Authorize</InterSemiBold>
        </Button>
      </View>
    </ScrollView>
  )

  // Listing Success Screen (Step 6)
  const ListingSuccessScreen = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#4CAF50",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 24 }}>✓</Text>
      </View>

      <InterSemiBold style={{ fontSize: 20, color: "#000", marginBottom: 15, textAlign: "center" }}>
        Listing successful
      </InterSemiBold>

      <InterRegular style={{ fontSize: 16, color: "#666", textAlign: "center", marginBottom: 40, lineHeight: 22 }}>
        Your property has been successfully listed on our marketplace, you will get notified whenever you have a
        potential buyer. Cheers!
      </InterRegular>

      <Button
        onPress={handleGoToHomepage}
        style={{
          backgroundColor: "#C1272D",
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 8,
        }}
      >
        <InterSemiBold style={{ color: "#FFF", fontSize: 16 }}>Got to homepage</InterSemiBold>
      </Button>
    </View>
  )

  // Render current step for seller mode
  const renderSellerStep = () => {
    switch (currentStep) {
      case 0:
        return <PropertyListingOverview />
      case 1:
        return <PropertyDescriptionForm />
      case 2:
        return <PropertyExtrasForm />
      case 3:
        return <PhotoUploadForm />
      case 4:
        return <PriceDescriptionForm />
      case 5:
        return <AuthorizeListingForm />
      case 6:
        return <ListingSuccessScreen />
      default:
        return <PropertyListingOverview />
    }
  }

  // If seller is viewing history
  if (isSeller && showHistory) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="container flex-1 mx-auto max-w-2xl" style={{ padding: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <BackBtn onPress={handleBackFromHistory} />
            <InterSemiBold className="text-lg/5" style={{ marginLeft: 15 }}>
              History
            </InterSemiBold>
          </View>

          {/* Headlist */}
          <View className="flex-row justify-between mt-4">
            {historyHeader.map((item, index) => (
              <Button
                key={index}
                color={activeIndex === index ? "#C1272D" : "#C1272D0A"}
                onPress={() => handleHistoryClick(index, item)}
                className="text-white rounded-lg"
              >
                <InterRegular className={activeIndex === index ? "text-white" : "text-secondaryText"}>
                  {item}
                </InterRegular>
              </Button>
            ))}
          </View>

          {/* History List */}
          <View className="mt-4">
            {isLoading ? (
              <View className="flex-1 justify-center items-center">
                <InterRegular className="text-secondaryText">Loading...</InterRegular>
              </View>
            ) : !history || history.length === 0 ? (
              <NoHistory headText={activeItem} />
            ) : (
              <HistoryList histories={history} historyType={activeItem} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  // If seller mode, render listing form
  if (isSeller) {
    return <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>{renderSellerStep()}</SafeAreaView>
  }

  // If buyer mode, render history
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="container flex-1 mx-auto max-w-2xl" style={{ padding: 20 }}>
        <View className="">
          <InterSemiBold className="text-lg/5">History</InterSemiBold>
        </View>

        {/* Headlist */}
        <View className="flex-row justify-between mt-4">
          {historyHeader.map((item, index) => (
            <Button
              key={index}
              color={activeIndex === index ? "#C1272D" : "#C1272D0A"}
              onPress={() => handleHistoryClick(index, item)}
              className="text-white rounded-lg"
            >
              <InterRegular className={activeIndex === index ? "text-white" : "text-secondaryText"}>
                {item}
              </InterRegular>
            </Button>
          ))}
        </View>

        {/* History List */}
        <View className="mt-4">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <InterRegular className="text-secondaryText">Loading...</InterRegular>
            </View>
          ) : !history || history.length === 0 ? (
            <NoHistory headText={activeItem} />
          ) : (
            <HistoryList histories={history} historyType={activeItem} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default History
