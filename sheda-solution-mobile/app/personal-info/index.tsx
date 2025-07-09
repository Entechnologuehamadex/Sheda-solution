import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import getMedia from "@/utilities/ImagePicker";
import Icon from "@/components/common/Icon";
import { PENCIL } from "@/assets/icons";
import StyledTextInput from "@/components/input/textInput";
import InterRegular from "@/components/Text/InterRegular";
import SelectInput from "@/components/input/selectInput";
import { SelectOption } from "@/components/input/selectInput/type";


const locationOptions: SelectOption[] = [
  { label: "Lekki, Lagos", value: "lekki" },
  { label: "Victoria Island, Lagos", value: "victoria-island" },
  { label: "Ikoyi, Lagos", value: "ikoyi" },
];

const PersonalInfo = () => {
   const [selectedLocation, setSelectedLocation] = React.useState<string>("User profile location"); //to manage select location state
   const [profileImg, setProfileImg] = React.useState(""); // to manage profile image state

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImg(result.assets[0].uri);
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
                    <Icon icon={PENCIL} width={16} height={16} className=""/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* the profile input section */}

            <View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">Full Name</InterRegular>
                <StyledTextInput placeholder="user full name as the value" />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">Agency Name(optional)</InterRegular>
                <StyledTextInput placeholder="Agency name as the value(if any)" />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">Phone number</InterRegular>
                <StyledTextInput placeholder="User account Phone number as the value" />
              </View>
              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">Email</InterRegular>
                <StyledTextInput placeholder="User account as the value" />
              </View>
              
              <View className="mb-3">
              <SelectInput
              label="Location"
              options={locationOptions}
              value={selectedLocation}
              onValueChange={(value) => setSelectedLocation(value as string)}
              />
              </View>

              <View className="mb-3">
                <InterRegular className="text-sm/[150%] mb-1">KYC status</InterRegular>
                <StyledTextInput placeholder="Pending verification" />
              </View>

                  {/* Save change button */}
              <View>
                <Button className="rounded-lg">
                  <InterSemiBold className="text-white">Save Changes</InterSemiBold>
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
