import React from "react";
import { View, Text, ImageBackground } from "react-native";
import InterRegular from "@/components/Text/InterRegular";
import InterMedium from "@/components/Text/InterMedium";
import InterBold from "@/components/Text/InterBold";
import { HouseProps } from "@/types";
import Button from "@/components/common/Button";
import { router } from "expo-router";
import Icon from "@/components/common/Icon";
import { MESSAGE, LOCATION, BED, BATH } from "@/assets/icons";
import totalPayment from "@/utilities/totalPayment";

const ActiveCard = ({ house }: { house: HouseProps }) => {
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
          <View className="items-end py-4">
            <InterRegular className="text-white bg-primary p-2 rounded-l-lg">
              Expires in 10 days
            </InterRegular>
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

          <Button
            isFull={false}
            color=""
            className="p-0 m-0 flex-row"
            onPress={() =>
              router.push({
                pathname: "/details/[id]",
                params: {
                  id: String(house.id),
                  propertyData: JSON.stringify(house),
                },
              })
            }
          >
            <Icon icon={MESSAGE} width={24} height={24} />
          </Button>
        </View>
      </View>

      <View className="flex-row justify-center border-t border-borderColor p-5">
        <Button
          isFull={false}
          color=""
          className="p-0 m-0 flex-row"
          onPress={() =>
            router.push({
              pathname: "/details/[id]",
              params: { id: String(house.id) },
            })
          }
        >
          <InterRegular className="text-primary">Open dispute</InterRegular>
        </Button>
      </View>
    </View>
  );
};

export default ActiveCard;
