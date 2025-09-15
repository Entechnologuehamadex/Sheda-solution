"use client";

import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import BackBtn from "@/components/common/BackBtn";
import SelectInput from "@/components/input/selectInput";
import Checkbox from "@/components/input/checkbox";
import historyHeader from "../../../constants/historyHeader";
import { useEffect, useState, useCallback } from "react";
import { NoHistory } from "@/components/history/NoHistory";
import { historyData } from "../../../constants/history-data";
import type { HouseProps, CancelledHistory } from "@/types";
import HistoryList from "../../../components/history/HistoryList";
import { useMode } from "@/contexts/ModeContext";
import { useApi } from "@/contexts/ApiContext";
import { router } from "expo-router";

// Standalone component to prevent remount on parent rerenders
function PriceDescriptionScreen({
  formData,
  setFormData,
  handleConfirmListing,
  handlePrevStep,
}: {
  formData: any;
  setFormData: (v: any) => void;
  handleConfirmListing: () => void;
  handlePrevStep: () => void;
}) {
  const [descriptionLocal, setDescriptionLocal] = useState(
    formData.description
  );
  const [priceLocal, setPriceLocal] = useState(formData.price);

  const syncToParent = () => {
    if (
      descriptionLocal !== formData.description ||
      priceLocal !== formData.price
    ) {
      setFormData({
        ...formData,
        description: descriptionLocal,
        price: priceLocal,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View className="px-5 pt-5">
          <View className="flex-row items-center mb-7">
            <BackBtn onPress={handlePrevStep} />
            <InterSemiBold className="text-[18px] text-black ml-5">
              List a property
            </InterSemiBold>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 8,
              marginVertical: 20,
              width: "100%",
            }}
          >
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={{
                  flex: 1,
                  height: 4,
                  backgroundColor: step <= 4 ? "#C1272D" : "#E5E5E5",
                  borderRadius: 2,
                }}
              />
            ))}
          </View>
        </View>

        <ScrollView
          className="flex-1 px-5"
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="mb-7">
            <InterSemiBold className="text-[18px] text-black mb-4">
              Add a description
            </InterSemiBold>
            <TextInput
              className="border border-[#E5E5E5] rounded-lg p-4 h-[120px] text-black text-[16px] font-['Inter-Regular'] mb-5"
              placeholder="Your description goes here..."
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              value={descriptionLocal}
              onChangeText={setDescriptionLocal}
              blurOnSubmit={false}
              returnKeyType="default"
              onBlur={syncToParent}
            />
          </View>

          <View className="mb-0">
            <InterSemiBold className="text-[18px] text-black mb-4">
              Set Price
            </InterSemiBold>
            <TextInput
              className="border border-[#E5E5E5] rounded-lg p-4 text-black text-[16px] font-['Inter-Regular'] mb-3"
              placeholder="500,000"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={priceLocal}
              onChangeText={setPriceLocal}
              blurOnSubmit={false}
              returnKeyType="done"
              onBlur={syncToParent}
            />
          </View>

          <View className="mb-10">
            <Checkbox
              label="Is this price negotiable?"
              value={formData.isNegotiable}
              onChange={(value) =>
                setFormData({ ...formData, isNegotiable: value })
              }
            />
          </View>
        </ScrollView>

        <View className="px-5 pb-8">
          <Button
            onPress={() => {
              syncToParent();
              handleConfirmListing();
            }}
            isFull={true}
            className="rounded-lg bg-[#C1272D]"
          >
            <InterSemiBold className="text-white text-[16px]">
              Confirm and list
            </InterSemiBold>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const History = () => {
  const { isSeller } = useMode();
  const { appointments, getMyListings, uploadFile, listProperty } = useApi();
  const [activeIndex, setIsActiveIndex] = useState<null | number>(0);
  const [activeItem, setActiveItem] = useState<null | any>("Ongoing");
  const [history, setHistory] = useState<
    (HouseProps | CancelledHistory)[] | null
  >(null);
  const [isLoading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const initialFormData = {
    propertyType: "Apartment",
    status: "For rent",
    location: "Lekki, Lagos",
    furnishing: "Unfurnished",
    bedrooms: "1",
    bathrooms: "1",
    extras: [] as string[],
    description: "",
    price: "500,000",
    isNegotiable: false,
    documentsUploaded: false,
    photos: [] as string[],
    documents: [] as string[],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleHistoryClick = (index: number, item: string) => {
    setIsActiveIndex(index);
    setActiveItem(item);
  };

  const handleHistoryPress = () => {
    setShowHistory(true);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleGetStarted = () => {
    setCurrentStep(1);
  };

  const handleConfirmListing = () => {
    setCurrentStep(5);
  };

  const handleDocumentUploaded = () => {
    setFormData({ ...formData, documentsUploaded: true });
    setCurrentStep(6);
  };

  const pickDocumentImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Please allow photo library access to upload documents."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const uploaded = await uploadFile("property", asset);
        setFormData({
          ...formData,
          documents: [...(formData.documents || []), uploaded.file_url],
        });
      }
    } catch (error) {
      Alert.alert(
        "Upload Error",
        "Failed to upload document. Please try again."
      );
    }
  };

  const handleAuthorize = async () => {
    try {
      // Transform formData to match API schema strictly (per api.json)
      const propertyData = {
        title: `${formData.propertyType} in ${formData.location}`,
        description: formData.description,
        location: formData.location,
        price: parseFloat((formData.price || "0").replace(/,/g, "")),
        property_type: (formData.propertyType || "apartment").toLowerCase() as
          | "apartment"
          | "land"
          | "shortlet"
          | "shared apartment",
        listing_type: (formData.status || "rent").toLowerCase().includes("rent")
          ? ("rent" as const)
          : ("sale" as const),
        status: "available" as const,
        furnished: (formData.furnishing || "Unfurnished") !== "Unfurnished",
        is_active: true,
        bathroom: parseInt(formData.bathrooms || "1", 10),
        bedroom: parseInt(formData.bedrooms || "1", 10),
        air_condition: formData.extras.includes("Air conditioner"),
        pop_ceiling: formData.extras.includes("Pop Ceiling"),
        floor_tiles: formData.extras.includes("Floor Tiles"),
        running_water: formData.extras.includes("Running water"),
        furniture: formData.extras.includes("Furniture"),
        prepaid_meter: formData.extras.includes("Prepaid meter"),
        wifi: formData.extras.includes("Wi-Fi"),
        is_negotiable: !!formData.isNegotiable,
        images: (formData.photos || []).map((url, index) => ({
          image_url: url,
          is_primary: index === 0,
        })),
      };

      // Submit the property listing to /api/v1/property/list-property
      await listProperty(propertyData);

      // Reset flow and show success
      setFormData(initialFormData);
      setCurrentStep(8);
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to submit property listing. Please try again."
      );
    }
  };

  const handleGoToHomepage = () => {
    router.push("/(tabs)/home");
    setCurrentStep(0);
  };

  const handleExtraToggle = (extra: string) => {
    const currentExtras = formData.extras || [];
    const updatedExtras = currentExtras.includes(extra)
      ? currentExtras.filter((item: string) => item !== extra)
      : [...currentExtras, extra];
    setFormData({ ...formData, extras: updatedExtras });
  };

  const pickImage = async () => {
    try {
      // Request permission to access media library before opening picker
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Please allow photo library access to upload property photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        // Upload the image to the server - use the same format as personal-info
        const uploadedFile = await uploadFile("property", asset);

        // Add the uploaded file URL to photos
        const newPhotos = [...formData.photos, uploadedFile.file_url];
        setFormData({ ...formData, photos: newPhotos });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again.";
      Alert.alert("Upload Error", errorMessage);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        if (isSeller) {
          // For sellers, fetch their property listings
          await getMyListings();
          // Transform listings to history format
          const listingsData = (historyData[
            String(activeItem) as keyof typeof historyData
          ] || []) as unknown as (HouseProps | CancelledHistory)[];
          setHistory(listingsData);
        } else {
          // For buyers, use appointment history or mock data
          const data = historyData[
            String(activeItem) as keyof typeof historyData
          ] as unknown as (HouseProps | CancelledHistory)[];
          setHistory(data);
        }
      } catch (error) {
        setHistory(null);
      } finally {
        setLoading(false);
      }
    };

    if (!isSeller || showHistory) {
      fetchHistory();
    }
  }, [activeItem, isSeller, showHistory, getMyListings]);

  // Progress Indicator Component
  const ProgressIndicator = ({ currentStep }: { currentStep: number }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        marginVertical: 20,
        width: "100%",
      }}
    >
      {[1, 2, 3, 4].map((step) => (
        <View
          key={step}
          style={{
            flex: 1,
            height: 4,
            backgroundColor: step <= currentStep ? "#C1272D" : "#E5E5E5",
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );

  // History View Component
  const HistoryView = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {isSeller && <BackBtn onPress={handleBackFromHistory} />}
          <InterSemiBold
            className={`text-lg leading-5 ${isSeller ? "ml-[15px]" : "ml-0"}`}
          >
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
              <InterRegular
                className={
                  activeIndex === index ? "text-white" : "text-secondaryText"
                }
              >
                {item}
              </InterRegular>
            </Button>
          ))}
        </View>

        {/* History List */}
        <View className="mt-4">
          {isLoading ? (
            <View className="flex-1 justify-center items-center">
              <InterRegular className="text-secondaryText">
                Loading...
              </InterRegular>
            </View>
          ) : !history || history.length === 0 ? (
            <NoHistory headText={activeItem} />
          ) : (
            <HistoryList histories={history} historyType={activeItem} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Screen 0: Property Listing Overview
  const steps = [
    {
      step: 1,
      title: "Describe your property",
      description:
        "Fill in the necessary information that best describes your property",
    },
    {
      step: 2,
      title: "Add extras",
      description:
        "Tick the amenities that make your property standout amidst others",
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
  ];

  const PropertyListingOverview = () => (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-5">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-5">
          <InterSemiBold className="text-[20px] text-black">
            List a property
          </InterSemiBold>
          <TouchableOpacity
            onPress={handleHistoryPress}
            className="flex-row items-center px-3 py-1.5 gap-2"
            activeOpacity={0.7}
            style={{
              backgroundColor: "transparent",
              borderRadius: 8,
              minHeight: 44,
              minWidth: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
            accessibilityLabel="View history"
          >
            <Image
              source={require("@/assets/images/history-button.png")}
              style={{
                width: 100,
                height: 60,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Progress bars */}
        <View className="flex-row space-x-2 mb-7">
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              className="flex-1 h-1 rounded"
              style={{ backgroundColor: "#E5E5E5" }}
            />
          ))}
        </View>

        <InterRegular className="text-[16px] text-black mb-10">
          Property listing made easy in 4 easy steps.
        </InterRegular>

        <View className="mb-15">
          {steps.map((item) => (
            <View key={item.step} className="flex-row items-start mb-7">
              <View
                className="w-8 h-8 rounded-full justify-center items-center mr-4"
                style={{ backgroundColor: "#C1272D" }}
              >
                <InterSemiBold className="text-white text-[16px]">
                  {item.step}
                </InterSemiBold>
              </View>
              <View className="flex-1">
                <InterSemiBold className="text-[16px] text-black mb-2">
                  {item.title}
                </InterSemiBold>
                <InterRegular className="text-[14px] text-gray-500 leading-5">
                  {item.description}
                </InterRegular>
              </View>
            </View>
          ))}
        </View>

        <Button
          onPress={handleNextStep}
          isFull={true}
          className="rounded-lg mb-10"
        >
          <InterSemiBold className="text-white text-[16px]">
            Get started
          </InterSemiBold>
        </Button>
      </ScrollView>
    </SafeAreaView>
  );

  // Screen 1: Property Description Form
  const PropertyDescriptionForm = () => {
    const propertyTypes = [
      { label: "Apartment", value: "Apartment" },
      { label: "House", value: "House" },
      { label: "Office", value: "Office" },
    ];

    const statusOptions = [
      { label: "For rent", value: "For rent" },
      { label: "For sale", value: "For sale" },
    ];

    const locations = [
      { label: "Lekki, Lagos", value: "Lekki, Lagos" },
      { label: "Victoria Island, Lagos", value: "Victoria Island, Lagos" },
      { label: "Ikeja, Lagos", value: "Ikeja, Lagos" },
    ];

    const furnishingOptions = [
      { label: "Unfurnished", value: "Unfurnished" },
      { label: "Semi-furnished", value: "Semi-furnished" },
      { label: "Fully furnished", value: "Fully furnished" },
    ];

    const bedroomOptions = [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ];

    const bathroomOptions = [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
    ];

    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-5 pt-5">
          <View className="flex flex-row items-center mb-8">
            <BackBtn onPress={handlePrevStep} />
            <InterSemiBold className="text-[18px] text-black ml-5">
              List a property
            </InterSemiBold>
          </View>

          <ProgressIndicator currentStep={1} />
        </View>

        <ScrollView className="flex-1 px-5">
          <SelectInput
            label="Property type"
            options={propertyTypes}
            value={formData.propertyType}
            onValueChange={(value) =>
              setFormData({ ...formData, propertyType: value as string })
            }
            inputStyle={{ paddingRight: 20 }}
          />

          <SelectInput
            label="Status"
            options={statusOptions}
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as string })
            }
            inputStyle={{ paddingRight: 20 }}
          />

          <SelectInput
            label="Location"
            options={locations}
            value={formData.location}
            onValueChange={(value) =>
              setFormData({ ...formData, location: value as string })
            }
            inputStyle={{ paddingRight: 20 }}
          />

          <SelectInput
            label="Furnishing"
            options={furnishingOptions}
            value={formData.furnishing}
            onValueChange={(value) =>
              setFormData({ ...formData, furnishing: value as string })
            }
            inputStyle={{ paddingRight: 20 }}
          />

          <SelectInput
            label="Bedrooms"
            options={bedroomOptions}
            value={formData.bedrooms}
            onValueChange={(value) =>
              setFormData({ ...formData, bedrooms: value as string })
            }
            inputStyle={{ paddingRight: 20 }}
          />

          <SelectInput
            label="Bathrooms"
            options={bathroomOptions}
            value={formData.bathrooms}
            onValueChange={(value) =>
              setFormData({ ...formData, bathrooms: value as string })
            }
            containerStyle={{ marginBottom: 40 }}
            inputStyle={{ paddingRight: 20 }}
          />
        </ScrollView>

        <View className="px-5 pb-8">
          <Button
            onPress={handleNextStep}
            isFull={true}
            className="rounded-lg bg-primary"
          >
            <InterSemiBold className="text-white text-base">Next</InterSemiBold>
          </Button>
        </View>
      </SafeAreaView>
    );
  };

  // Screen 2: Property Extras Form
  const PropertyExtrasForm = () => {
    const extras = [
      "Air conditioner",
      "Pop Ceiling",
      "Floor Tiles",
      "Running water",
      "Furniture",
      "Prepaid meter",
      "Wi-Fi",
    ];

    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-5 pt-5">
          <View className="flex-row items-center mb-8">
            <BackBtn onPress={handlePrevStep} />
            <InterSemiBold className="text-lg text-black ml-5">
              List a property
            </InterSemiBold>
          </View>

          <ProgressIndicator currentStep={2} />
        </View>

        <ScrollView className="flex-1 px-5">
          <InterSemiBold className="text-lg text-black mb-8">
            Property extras
          </InterSemiBold>

          <View className="mb-10">
            {extras.map((extra, index) => (
              <Checkbox
                key={index}
                label={extra}
                value={formData.extras.includes(extra)}
                onChange={() => handleExtraToggle(extra)}
              />
            ))}
          </View>
        </ScrollView>

        <View className="px-5 pb-8">
          <Button
            onPress={handleNextStep}
            isFull={true}
            className="rounded-lg bg-primary"
          >
            <InterSemiBold className="text-white text-base">Next</InterSemiBold>
          </Button>
        </View>
      </SafeAreaView>
    );
  };

  // Screen 3: Photo Upload Form
  const PhotoUploadForm = () => {
    const renderPhotoSlot = (index: number) => {
      const hasPhoto = formData.photos[index];

      return (
        <TouchableOpacity
          key={index}
          onPress={hasPhoto ? () => removePhoto(index) : pickImage}
          className="w-[47%] sm:w-[30%] aspect-square bg-[#F5F5F5] rounded-lg justify-center items-center mb-4 border border-[#E5E5E5]"
        >
          {hasPhoto ? (
            <Image
              source={{ uri: hasPhoto }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <View className="w-5 h-5 justify-center items-center">
              <View className="w-3.5 h-0.5 bg-primary rounded-sm" />
              <View className="w-0.5 h-3.5 bg-primary rounded-sm absolute" />
            </View>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Header & Progress */}
        <View className="px-3 sm:px-4 md:px-6 pt-5">
          <View className="flex-row items-center mb-6">
            <BackBtn onPress={handlePrevStep} />
            <InterSemiBold className="text-base sm:text-lg text-black ml-3 sm:ml-5">
              List a property
            </InterSemiBold>
          </View>

          <ProgressIndicator currentStep={3} />
        </View>

        {/* Scrollable Content */}
        <ScrollView className="flex-1 px-3 sm:px-4 md:px-6">
          <InterSemiBold className="text-base sm:text-lg text-black mb-6">
            Add at least 4 photos
          </InterSemiBold>

          {/* Photo Grid */}
          <View className="flex-row flex-wrap justify-between mb-8">
            {[0, 1, 2, 3].map(renderPhotoSlot)}
          </View>

          {/* Add More Button */}
          {formData.photos.length >= 4 && (
            <TouchableOpacity
              onPress={pickImage}
              className="flex-row items-center justify-between py-3 px-3 bg-[#F5F5F5] rounded-lg mb-10"
            >
              <InterRegular className="text-sm sm:text-base text-black">
                Add more
              </InterRegular>
              <View className="w-4 h-4 justify-center items-center">
                <View className="w-2.5 h-0.5 bg-primary rounded-sm" />
                <View className="w-0.5 h-2.5 bg-primary rounded-sm absolute" />
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Bottom CTA */}
        <View className="px-3 sm:px-4 md:px-6 pb-8">
          <Button
            onPress={handleNextStep}
            isFull={true}
            className="rounded-lg bg-primary"
          >
            <InterSemiBold className="text-sm sm:text-base text-white">
              Next
            </InterSemiBold>
          </Button>
        </View>
      </SafeAreaView>
    );
  };

  // Screen 4: Price Description Form
  const PriceDescriptionForm = () => {
    const [descriptionLocal, setDescriptionLocal] = useState(
      formData.description
    );
    const [priceLocal, setPriceLocal] = useState(formData.price);

    const syncToParent = () => {
      if (
        descriptionLocal !== formData.description ||
        priceLocal !== formData.price
      ) {
        setFormData({
          ...formData,
          description: descriptionLocal,
          price: priceLocal,
        });
      }
    };

    return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View className="px-5 pt-5">
            <View className="flex-row items-center mb-7">
              <BackBtn onPress={handlePrevStep} />
              <InterSemiBold className="text-[18px] text-black ml-5">
                List a property
              </InterSemiBold>
            </View>

            <ProgressIndicator currentStep={4} />
          </View>

          <ScrollView
            className="flex-1 px-5"
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="none"
            contentContainerStyle={{ paddingBottom: 24 }}
          >
            <View className="mb-7">
              <InterSemiBold className="text-[18px] text-black mb-4">
                Add a description
              </InterSemiBold>
              <TextInput
                className="border border-[#E5E5E5] rounded-lg p-4 h-[120px] text-black text-[16px] font-['Inter-Regular'] mb-5"
                placeholder="Your description goes here..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                value={descriptionLocal}
                onChangeText={setDescriptionLocal}
                blurOnSubmit={false}
                returnKeyType="default"
                onBlur={syncToParent}
              />
            </View>

            <View className="mb-0">
              <InterSemiBold className="text-[18px] text-black mb-4">
                Set Price
              </InterSemiBold>
              <TextInput
                className="border border-[#E5E5E5] rounded-lg p-4 text-black text-[16px] font-['Inter-Regular'] mb-3"
                placeholder="500,000"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={priceLocal}
                onChangeText={setPriceLocal}
                blurOnSubmit={false}
                returnKeyType="done"
                onBlur={syncToParent}
              />
            </View>

            <View className="mb-10">
              <Checkbox
                label="Is this price negotiable?"
                value={formData.isNegotiable}
                onChange={(value) =>
                  setFormData({ ...formData, isNegotiable: value })
                }
              />
            </View>
          </ScrollView>

          <View className="px-5 pb-8">
            <Button
              onPress={() => {
                syncToParent();
                handleConfirmListing();
              }}
              isFull={true}
              className="rounded-lg bg-[#C1272D]"
            >
              <InterSemiBold className="text-white text-[16px]">
                Confirm and list
              </InterSemiBold>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

  // Screen 5: Property Summary Screen
  const PropertySummaryScreen = () => (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-5">
        <InterSemiBold className="text-[18px] text-black mb-8">
          Authorize listing
        </InterSemiBold>

        <View className="w-full h-[200px] bg-[#F5F5F5] rounded-xl mb-5 overflow-hidden">
          {formData.photos && formData.photos.length > 0 ? (
            <Image
              source={{ uri: formData.photos[0] }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../../../assets/images/apt-1.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
        </View>

        <InterSemiBold className="text-[18px] text-black mb-2">
          {formData.propertyType || "Property"}
        </InterSemiBold>

        <View className="flex-row items-center mb-8">
          <View className="w-4 h-4 rounded-full bg-[#E5E5E5] mr-2" />
          <InterRegular className="text-[14px] text-[#666666]">
            {formData.location || "Location not specified"}
          </InterRegular>
        </View>

        <View className="mb-8">
          <InterSemiBold className="text-[16px] text-black mb-2">
            Description
          </InterSemiBold>
          <InterRegular className="text-[14px] text-[#666666] leading-5">
            {formData.description || "No description provided."}
          </InterRegular>
        </View>

        <View className="flex-row justify-between items-center py-[15px] border-b border-[#E5E5E5]">
          <InterSemiBold className="text-[16px] text-black">
            Rent/yr
          </InterSemiBold>
          <InterSemiBold className="text-[16px] text-black">
            {`N${formData.price || "0"}`}
          </InterSemiBold>
        </View>

        {!!(formData as any).damages && (
          <View className="flex-row justify-between items-center py-[15px] mb-[60px]">
            <InterSemiBold className="text-[16px] text-black">
              Damages
            </InterSemiBold>
            <InterSemiBold className="text-[16px] text-black">
              {`N${(formData as any).damages}`}
            </InterSemiBold>
          </View>
        )}
      </ScrollView>

      <View className="flex-row px-6 pb-[30px] space-x-[15px]">
        <Button
          onPress={handlePrevStep}
          className="flex-1 flex-shrink-0 border border-[#E5E5E5] py-3 sm:py-4 rounded-lg"
          style={{ backgroundColor: "white" }}
        >
          <InterSemiBold className="text-black text-sm sm:text-base">
            Cancel
          </InterSemiBold>
        </Button>

        <Button
          onPress={handleNextStep}
          className="flex-1 flex-shrink-0 bg-[#C1272D] py-3 sm:py-4 rounded-lg"
        >
          <InterSemiBold className="text-white text-sm sm:text-base whitespace-nowrap">
            Upload documents
          </InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  );

  // Screen 6: Document Upload Screen
  const DocumentUploadScreen = () => (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-5">
        <InterSemiBold className="text-[20px] text-black mb-8">
          Authorize listing
        </InterSemiBold>

        <View className="w-full h-[200px] bg-[#F5F5F5] rounded-[12px] mb-5 overflow-hidden">
          <Image
            source={require("../../../assets/images/apt-1.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <InterSemiBold className="text-[18px] text-black mb-2">
          Modern Self-contained apartment
        </InterSemiBold>

        <View className="flex-row items-center mb-10">
          <View className="w-4 h-4 rounded-full bg-[#E5E5E5] mr-2" />
          <InterRegular className="text-[14px] text-[#666]">
            Lekki, Lagos
          </InterRegular>
        </View>

        <InterSemiBold className="text-[16px] text-black mb-2">
          Upload document
        </InterSemiBold>
        <InterRegular className="text-[14px] text-[#666] mb-10">
          Upload property documents here; C of O...
        </InterRegular>

        <TouchableOpacity
          onPress={pickDocumentImage}
          className="h-[200px] bg-[#F5F5F5] rounded-lg border-2 border-[#E5E5E5] border-dashed justify-center items-center mb-5"
        >
          <View className="w-6 h-6 justify-center items-center relative">
            <View className="w-4 h-0.5 bg-[#C1272D] rounded-sm" />
            <View className="w-0.5 h-4 bg-[#C1272D] rounded-sm absolute" />
          </View>
        </TouchableOpacity>

        {!!formData.documents?.length && (
          <View className="mb-10">
            {formData.documents.map((doc, idx) => (
              <View
                key={`${doc}-${idx}`}
                className="flex-row items-center justify-between py-3 border-b border-[#E5E5E5]"
              >
                <InterRegular
                  className="text-[14px] text-black flex-1 mr-3"
                  numberOfLines={1}
                >
                  {doc}
                </InterRegular>
                <TouchableOpacity
                  onPress={() =>
                    setFormData({
                      ...formData,
                      documents: formData.documents.filter((_, i) => i !== idx),
                    })
                  }
                  className="px-3 py-1 rounded-lg"
                  style={{ backgroundColor: "#C1272D0A" }}
                >
                  <InterRegular className="text-primary">Remove</InterRegular>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View className="flex-row px-5 pb-[30px] space-x-[15px]">
        <Button
          onPress={handlePrevStep}
          className="flex-1 flex-shrink-0 border border-[#E5E5E5] py-3 sm:py-4 rounded-lg"
          style={{ backgroundColor: "white" }}
        >
          <InterSemiBold className="text-black text-sm sm:text-base">
            Cancel
          </InterSemiBold>
        </Button>

        <Button
          onPress={handleNextStep}
          className="flex-1 flex-shrink-0 bg-[#C1272D] py-3 sm:py-4 rounded-lg"
        >
          <InterSemiBold className="text-white text-sm sm:text-base whitespace-nowrap">
            Upload documents
          </InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  );

  // Screen 7: Authorize Listing Form (with uploaded status)
  const AuthorizeListingForm = () => (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-5">
        <InterSemiBold className="text-[20px] text-black mb-8">
          Authorize listing
        </InterSemiBold>

        <View className="w-full h-[200px] bg-[#F5F5F5] rounded-[12px] mb-5 overflow-hidden">
          {formData.photos && formData.photos.length > 0 ? (
            <Image
              source={{ uri: formData.photos[0] }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../../../assets/images/apt-1.png")}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
        </View>

        <InterSemiBold className="text-[18px] text-black mb-2">
          {formData.propertyType || "Property"}
        </InterSemiBold>

        <View className="flex-row items-center mb-5">
          <View className="w-4 h-4 rounded-full bg-[#E5E5E5] mr-2" />
          <InterRegular className="text-[14px] text-[#666]">
            {formData.location || "Location not specified"}
          </InterRegular>
        </View>

        <InterSemiBold className="text-[16px] text-black mb-2">
          Description
        </InterSemiBold>
        <InterRegular className="text-[14px] text-[#666] leading-[20px] mb-5">
          {formData.description || "No description provided."}
        </InterRegular>

        <View className="flex-row justify-between py-[15px] border-b border-[#E5E5E5]">
          <InterSemiBold className="text-[16px] text-black">
            Rent/yr
          </InterSemiBold>
          <InterSemiBold className="text-[16px] text-black">
            {`N${formData.price || "0"}`}
          </InterSemiBold>
        </View>

        {!!(formData as any).damages && (
          <View className="flex-row justify-between py-[15px] border-b border-[#E5E5E5] mb-7">
            <InterSemiBold className="text-[16px] text-black">
              Damages
            </InterSemiBold>
            <InterSemiBold className="text-[16px] text-black">
              {`N${(formData as any).damages}`}
            </InterSemiBold>
          </View>
        )}

        <View className="flex-row justify-between items-center mb-15">
          <InterSemiBold className="text-[16px] text-black">
            Document upload status
          </InterSemiBold>
          <InterRegular className="text-[14px] text-[#C1272D]">
            {formData.documentsUploaded || (formData.documents?.length || 0) > 0
              ? "Uploaded"
              : "Not uploaded"}
          </InterRegular>
        </View>
      </ScrollView>

      <View className="flex-row px-5 pb-[30px] space-x-[15px]">
        <Button
          onPress={handlePrevStep}
          className="flex-1 border border-[#E5E5E5] py-4 rounded-lg"
          style={{ backgroundColor: "white" }}
        >
          <InterSemiBold className="text-black text-[15px]">
            Cancel
          </InterSemiBold>
        </Button>

        <Button
          onPress={handleAuthorize}
          className="flex-1 flex-shrink-0 bg-[#C1272D] py-3 sm:py-4 rounded-lg"
        >
          <InterSemiBold className="text-white text-sm sm:text-base whitespace-nowrap">
            Authorize
          </InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  );

  // Screen 8: Listing Success Screen
  const ListingSuccessScreen = () => (
    <SafeAreaView className="flex-1 bg-white justify-center items-center px-5">
      <View className="w-20 h-20 rounded-full bg-[#E8F5E8] justify-center items-center mb-7">
        <View className="w-10 h-10 rounded-full border-[3px] border-[#4CAF50] justify-center items-center">
          <View className="w-4 h-3 border-l-[3px] border-b-[3px] border-[#4CAF50] -rotate-45 mt-[-3px] ml-[2px]" />
        </View>
      </View>

      <InterSemiBold className="text-[20px] text-black mb-4 text-center">
        Listing successful
      </InterSemiBold>

      <InterRegular className="text-[16px] text-[#666] text-center leading-[24px] mb-10 px-5">
        Your property has been successfully listed on our marketplace, you will
        get notified whenever you have a potential buyer. Cheers!
      </InterRegular>

      <Button
        onPress={handleGoToHomepage}
        className="bg-[#C1272D] py-4 px-10 rounded-lg min-w-[200px] items-center"
      >
        <InterSemiBold className="text-white text-base">
          Go to homepage
        </InterSemiBold>
      </Button>
    </SafeAreaView>
  );

  // Render current step for seller mode
  const renderSellerStep = () => {
    switch (currentStep) {
      case 0:
        return <PropertyListingOverview />;
      case 1:
        return <PropertyDescriptionForm />;
      case 2:
        return <PropertyExtrasForm />;
      case 3:
        return <PhotoUploadForm />;
      case 4:
        return (
          <PriceDescriptionScreen
            formData={formData}
            setFormData={setFormData}
            handleConfirmListing={handleConfirmListing}
            handlePrevStep={handlePrevStep}
          />
        );
      case 5:
        return <PropertySummaryScreen />;
      case 6:
        return <DocumentUploadScreen />;
      case 7:
        return <AuthorizeListingForm />;
      case 8:
        return <ListingSuccessScreen />;
      default:
        return <PropertyListingOverview />;
    }
  };

  // Main render logic
  if (showHistory || !isSeller) {
    return <HistoryView />;
  }

  if (isSeller) {
    return renderSellerStep();
  }

  return null;
};

export default History;
