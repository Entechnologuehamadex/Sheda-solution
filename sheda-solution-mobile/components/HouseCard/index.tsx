import React from "react";
import { View, Text, ImageBackground } from "react-native";
import InterRegular from "../Text/InterRegular";
import InterMedium from "../Text/InterMedium";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InterBold from "../Text/InterBold";
import { HouseCardProps } from "./types";

const HouseCard = ({ house }: { house: HouseCardProps }) => {
  // console.log(house);
  return (
    <View className="w-full rounded-lg bg-background">
      <View className=" rounded-t-lg overflow-hidden">
      <ImageBackground
        source={house.image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 175,
          borderRadius: 8,
        }}
      >
        <View className="items-end px-2 py-4">
          <EvilIcons name="heart" size={44} color="#C1272D" />
        </View>
      </ImageBackground>
      </View>
     

      <View className="px-3 py-2 w-full">
        <InterMedium className="text-sm/5">{house.type}</InterMedium>

        <View className="mt-2 w-full py-2">
          {/* <View className="flex-row items-center border-r border-[#FFFFFF99]"> */}
          <View className="flex-row w-1/2 gap-2">
          <View className="flex-row items-center ">
            <EvilIcons
              name="location"
              size={20}
              color="#878787BF"
            />
            <InterRegular className="text-[#878787BF]">
              {house.location}
            </InterRegular>
          </View>

          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="bed-outline"
              size={20}
              color="#878787BF"
            />
            <InterRegular className="text-[#878787BF]">
              {house.bedrooms} Bed
            </InterRegular>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="bathtub-outline"
              size={20}
              color="#878787BF"
            />
            <InterRegular className="text-[#878787BF]">
              {house.bathrooms} Bath
            </InterRegular>
          </View>
          </View>
         
        </View>

        <View className="flex-row justify-between items-center">
          <InterBold className="text-lg">{house.price}/yr</InterBold>

          <View className="flex-row items-center justify-center gap">
            <InterRegular className="text-base text-primary">
              View Details
            </InterRegular>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#C1272D"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HouseCard;
