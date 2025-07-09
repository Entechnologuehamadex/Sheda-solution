import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import InterRegular from "../Text/InterRegular";
import InterMedium from "../Text/InterMedium";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InterBold from "../Text/InterBold";
import Link from "expo-router/link";
import { HouseCardProps } from "./types";
import Button from "../common/Button";
import { router } from "expo-router";
import { HouseProps } from "@/types";
import totalPayment from "@/utilities/totalPayment";
import { BED, BATH, LOCATION, HEART } from "@/assets/icons";
import Icon from "../common/Icon";

const HouseCard = ({ house }: { house: HouseProps }) => {
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
            <Icon icon={HEART} width={30} height={25} />
          </View>
        </ImageBackground>
      </View>

      <View className="px-3 py-2 w-full">
        <InterMedium className="text-sm/5">{house.type}</InterMedium>

        <View className="mt-2 w-full">
          {/* <View className="flex-row items-center border-r border-[#FFFFFF99]"> */}
          <View className="flex-row w-1/2 gap-2">
            <View className="flex-row items-center gap-1">
              <Icon icon={LOCATION} width={10} height={20} />
              <InterMedium className="text-[#878787BF] text-xs/[150%]">
                {house.location}
              </InterMedium>
            </View>

            <View className="flex-row items-center gap-1">
              <Icon icon={BED} width={20} height={20} />
              <InterMedium className="text-[#878787BF] text-xs/[150%]">
                {house.bedrooms} Bed
              </InterMedium>
            </View>
            <View className="flex-row items-cend gap-1">
              <Icon icon={BATH} width={15} height={15} />
              <InterMedium className="text-[#878787BF] text-xs/[150%]">
                {house.bathrooms} Bath
              </InterMedium>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <InterBold className="text-lg">
            N{totalPayment(house.price)}
            {house.mode === "rent" ? "/yr" : ""}
          </InterBold>

          {/* <View className="flex-row items-center justify-center gap">
            <Link
              href={{
                pathname: "/details/[id]",
                params: { id: house.id  },
              }}
            >
              <InterRegular className="text-base text-primary">
                View Details
              </InterRegular>
            </Link>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#C1272D"
            />
          </View> */}

          <TouchableOpacity
            className="flex-row items-center"
            onPress={() =>
              router.push({
                pathname: "/details/[id]",
                params: { id: house.id },
              })
            }
          >
            <InterRegular className="text-primary">View Details</InterRegular>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#C1272D"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HouseCard;
