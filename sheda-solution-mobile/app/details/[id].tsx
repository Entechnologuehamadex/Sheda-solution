import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import getDetails from "./getDetails";
import BackBtn from "@/components/common/BackBtn";
import { HouseCardProps } from "@/components/HouseCard/types";
import Favorite from "@/components/common/Favorite";
import InterMedium from "@/components/Text/InterMedium";
import { LOCATION, BED, BATH, MESSAGE, PHONE } from "@/assets/icons";
import Icon from "@/components/common/Icon";
import InterRegular from "@/components/Text/InterRegular";
import { StarRatingDisplay } from "react-native-star-rating-widget"; //https://www.npmjs.com/package/react-native-star-rating-widget
import Comments from "./Comments";
import StyledTextInput from "@/components/input/textInput";
import Button from "@/components/common/Button";
import HouseList from "@/components/HouseList";
import InterBold from "@/components/Text/InterBold";

const Details = () => {
  // Safely extract id from search params
  const { id } = useLocalSearchParams();
  const propertyId = Array.isArray(id) ? id[0] : id; // Handle string | string[]

  // Fetch property details with error handling
  let property: HouseCardProps | null = null;
  try {
    if (propertyId) {
      property = getDetails(propertyId);
    }
  } catch (error) {
    console.error("Error fetching property details:", error);
  }

  // Handle case where property is not found
  if (!property || !propertyId) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 justify-center items-center">
          <InterMedium className="text-primaryText text-lg">
            Property not found
          </InterMedium>
        </View>
      </SafeAreaView>
    );
  }

  console.log(property.seller);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 80,
          //   paddingTop: Platform.OS === "ios" ? 0 : 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={
            typeof property.image === "string"
              ? { uri: property.image } // For remote URLs
              : property.image // For local assets (e.g., require("../path"))
          }
          resizeMode="cover"
          style={{
            width: "100%",
            height: 325,
          }}
        >
          <View className="p-4 flex-row justify-between items-center">
            <BackBtn className="bg-white" />
            <Favorite className="bg-white" />
          </View>
        </ImageBackground>

        <View className="p-5">
          <InterMedium className="text-base/5">{property.type}</InterMedium>
          <View className="flex-row gap-1 items-center mt-1">
            <Icon
              icon={LOCATION}
              width={10}
              height={12}
              className="text-secondaryText"
            />
            <InterRegular className="text-secondaryText text-sm/[150%]">
              {property.location}
            </InterRegular>
          </View>
          {/* bed and bath icons */}
          <View className="flex-row gap-2 items-center my-3">
            <View className="flex-row items-center justify-center p-2 gap-1 border border-secondaryText rounded-lg">
              <Icon icon={BED} width={17} height={8} />
              <InterRegular className="text-secondaryText text-xs/[150%]">
                {property.bedrooms} Bed
              </InterRegular>
            </View>
            <View className="flex-row items-center justify-center p-2 gap-1 border border-secondaryText rounded-lg">
              <Icon icon={BATH} width={17} height={8} />
              <InterRegular className="text-secondaryText text-xs/[150%]">
                {property.bathrooms} Bed
              </InterRegular>
            </View>
          </View>
        </View>

        <View className="border-t border-borderColor">
          <View className="px-5 py-3 flex-row justify-between">
            <View className="flex-row gap-3 items-center">
              <Image
                source={property.seller?.photo}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                }}
              />
              <View>
                <InterMedium className="text-base/5">
                  {property.seller?.name}
                </InterMedium>
                <View className="flex-row items-center gap-1">
                  <InterRegular className="text-secondaryText text-sm/[150%]">
                    {property.seller?.isActive ? "Active Now" : "Inactive"}
                  </InterRegular>
                  <View
                    className={`h-2 w-2 ${
                      property.seller?.isActive ? `bg-green-500` : `bg-red-500`
                    } rounded-full`}
                  ></View>
                </View>
              </View>
            </View>
            <View className="flex-row gap-3">
              <Icon
                icon={MESSAGE}
                width={17}
                height={17}
                className="border border-borderColor rounded-lg py-2 px-3 justify-center"
              />
              <Icon
                icon={PHONE}
                width={17}
                height={17}
                className="py-2 px-3 rounded-lg bg-primary justify-center"
              />
            </View>
          </View>
        </View>
        <View className="px-5 py-3 border-t border-borderColor">
          <InterRegular className="text-base/5">Description</InterRegular>
          <InterRegular className="text-secondaryText text-sm/[150%] mt-2">
            {property.description}
          </InterRegular>

          <View className="mt-3">
            <InterRegular className="text-base/5">Extras</InterRegular>
            <View className="flex-row gap-2 mt-2 w-full flex-wrap">
              {property.extras.map((extra, index) => (
                <InterRegular
                  key={index}
                  className="bg-[#00000008] text-secondaryText p-2 rounded-lg"
                >
                  {extra}
                </InterRegular>
              ))}
            </View>
          </View>
        </View>
        <View className="px-5 py-3 border-t border-borderColor">
          <View className="flex-row justify-between items-center">
            <InterRegular className="text-sm/[150%]">
              Review ({property.seller?.reviews?.length})
            </InterRegular>
            <StarRatingDisplay rating={property.seller?.rating} starSize={15} />
          </View>
          {/* review section */}
          {property.seller?.reviews ? (
            <View className="py-2">
              <Comments reviews={property.seller?.reviews} />
            </View>
          ) : (
            ""
          )}
        </View>

        {/* make offer */}
        <View className="px-5 py-3 border-t border-borderColor">
          <InterRegular className="text-sm/[150%]">Make offer</InterRegular>
          <View className="my-3">
            <StyledTextInput placeholder="N350,000" />
          </View>
          <Button className="rounded-lg">
            <InterRegular className="text-white">Send offer</InterRegular>
          </Button>
        </View>

          {/* similar listings */}
        <View className="px-5 py-3 border-t border-borderColor">
        <InterRegular className="text-sm/[150%]">Similar listings</InterRegular>
        
        <View className="my-2">
          {/* similar house placeholder */}
          <HouseList />
        </View>
        </View>
      </ScrollView>


      {/* Fixed Footer with Price per Year and Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-borderColor p-4">
          <View className="flex-row items-center justify-between">
            <View>
              <InterMedium className="text-sm text-secondaryText">
                {property.mode === "rent" ? "Rent" : "Buy" }
              </InterMedium>
              <InterBold className="text-lg text-primaryText">
              {property.mode === "rent" ? `${property.price}/yr` : `${property.price}` }
              </InterBold>
            </View>
            <Button
              onPress={() => console.log("Book Now pressed")} // Replace with your action
              className="bg-primary py-3 px-6 rounded-lg"
            >
              <InterRegular className="text-white text-center">
              {property.mode === "rent" ? "Rent Now" : "Buy Now" }
              </InterRegular>
            </Button>
          </View>
        </View>
      
    </SafeAreaView>
  );
};

export default Details;
