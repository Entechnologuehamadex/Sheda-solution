import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import getMedia from "@/utilities/ImagePicker";
import Icon from "@/components/common/Icon";
import { PENCIL } from "@/assets/icons";
import StyledTextInput from "@/components/input/textInput";
import InterRegular from "@/components/Text/InterRegular";
import SelectInput from "@/components/input/selectInput";
import { SelectOption } from "@/components/input/selectInput/type";
import { useApi } from "@/contexts/ApiContext";
import { router } from "expo-router";

const locationOptions: SelectOption[] = [
  { label: "Lekki, Lagos", value: "lekki" },
  { label: "Victoria Island, Lagos", value: "victoria-island" },
  { label: "Ikoyi, Lagos", value: "ikoyi" },
];

const PersonalInfo = () => {
  const { user, getMe, updateMe, uploadFile, isLoading, error } = useApi();
  const [selectedLocation, setSelectedLocation] = useState<string>(
    "User profile location"
  );
  const [profileImg, setProfileImg] = useState("");
  const [fullName, setFullName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    getMe();
  }, [getMe]);

  // Update form fields when user data loads
  useEffect(() => {
    if (user) {
      setFullName(user.fullname || "");
      setAgencyName(user.agency_name || "");
      setPhoneNumber(user.phone_number || "");
      setEmail(user.email || "");
      setSelectedLocation(user.location || "User profile location");
      setProfileImg(user.profile_pic || "");
    }
  }, [user]);

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        // Upload the image to the server
        const uploadedFile = await uploadFile("profile", result.assets[0]);
        setProfileImg(uploadedFile.file_url);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateMe({
        fullname: fullName,
        agency_name: agencyName,
        phone_number: phoneNumber,
        email: email,
        location: selectedLocation,
        profile_pic: profileImg,
      });

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Profile Info</InterSemiBold>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mt-5">
            {/* profile image section */}
            <View className="flex-row items-center justify-center gap-4">
              <View className="relative w-28 h-28">
                <View className="justify-center items-center rounded-full overflow-hidden">
                  <Image
                    source={
                      profileImg
                        ? { uri: profileImg }
                        : require("@/assets/images/sheda-logo.png")
                    }
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <TouchableOpacity
                  className="rounded-full bg-primary p-4 absolute right-0 m-0 bottom-0 "
                  onPress={pickImage}
                >
                  <View pointerEvents="none">
                    <Icon icon={PENCIL} width={16} height={16} className="" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* the profile input section */}

            <View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">
                  Full Name
                </InterRegular>
                <StyledTextInput
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">
                  Agency Name(optional)
                </InterRegular>
                <StyledTextInput
                  placeholder="Enter agency name (if any)"
                  value={agencyName}
                  onChangeText={setAgencyName}
                />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">
                  Phone number
                </InterRegular>
                <StyledTextInput
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">
                  Email
                </InterRegular>
                <StyledTextInput
                  placeholder="Enter email address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View className="mb-3">
                <SelectInput
                  label="Location"
                  options={locationOptions}
                  value={selectedLocation}
                  onValueChange={(value) =>
                    setSelectedLocation(value as string)
                  }
                />
              </View>

              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">
                  KYC status
                </InterRegular>
                <StyledTextInput
                  placeholder={user?.kyc_status || "Pending verification"}
                  editable={false}
                />
              </View>

              {/* Save change button */}
              <View>
                <Button
                  className="rounded-lg"
                  onPress={handleSaveChanges}
                  disabled={isSaving}
                >
                  <InterSemiBold className="text-white">
                    {isSaving ? "Saving..." : "Save Changes"}
                  </InterSemiBold>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;
