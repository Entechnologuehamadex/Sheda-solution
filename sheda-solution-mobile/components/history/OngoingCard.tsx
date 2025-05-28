import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import InterRegular from "@/components/Text/InterRegular";
import InterMedium from "@/components/Text/InterMedium";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InterBold from "@/components/Text/InterBold";
import Link from "expo-router/link";
import HouseCard from "@/components/HouseCard";
import { HouseProps } from "@/types";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import Icon from "@/components/common/Icon";
import { MESSAGE, LOCATION, BATH, BED } from "@/assets/icons";
import totalPayment from "@/utilities/totalPayment";

const OngoingCard = ({ house }: { house: HouseProps }) => {
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
      {/* started here */}
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

          <Button
            isFull={false}
            color=""
            className="p-0 m-0 flex-row"
            onPress={() =>
              router.push({
                pathname: "/details/[id]",
                params: { id: house.id },
              })
            }
          >
            <Icon icon={MESSAGE} width={24} height={24} />
          </Button>
        </View>
      </View>

      <View className="flex-row border-t border-borderColor">
        <View className="w-1/2 border-r border-borderColor">
          <Button color="" isFull>
            <InterRegular>Cancel</InterRegular>
          </Button>
        </View>
        <View className="w-1/2">
          <Button
            color=""
            isFull
            onPress={() =>
              router.push({
                pathname: "/release-payment",
                params: { id: house.id },
              })
            }
          >
            <InterRegular className="text-primary">
              Release payment
            </InterRegular>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OngoingCard;
