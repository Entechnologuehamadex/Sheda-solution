import { SafeAreaView, View, Image } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import Icon from "@/components/common/Icon";
import { SUCCESSFUL } from "@/assets/icons";
import InterMedium from "@/components/Text/InterMedium";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import getDetails from "../details/getDetails";
import { HouseCardProps } from "@/components/HouseCard/types";
import { MESSAGE, PHONE } from "@/assets/icons";

const AppointmentBooked = () => {
  // const [property , setProperty] = useState<HouseCardProps | null>()

  const { id } = useGlobalSearchParams();

  let property: HouseCardProps | null = null;
  try {
    if (id) {
      property = getDetails(id as string);
    }
  } catch (error) {}

  // useEffect(() => {
  // const data = getDetails(id as string)
  // console.log(data)
  //     if(data){
  //         console.log(data.seller?.name)
  //         setProperty(data)
  //     }
  // }, [])

  return (
    <SafeAreaView
      className="container flex-1 max-w-2xl mx-auto"
      style={{ padding: 20 }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 bg-[#D8DADC26] rounded-full justify-center items-center">
          <Icon icon={SUCCESSFUL} width={35} height={35} />
        </View>
        <View className="mt-4">
          <InterSemiBold className="text-base/5 mb-1 text-center">
            Appointment successful
          </InterSemiBold>
          <InterRegular className="text-sm/5 text-center text-secondaryText">
            Your scheduled date has been sent to the seller and they will be
            notified.
          </InterRegular>
        </View>

        <View className="border-y border-borderColor w-full my-4">
          <View className="px-5 py-3 flex-row justify-between">
            <View className="flex-row gap-3 items-center">
              <Image
                source={property?.seller?.photo}
                resizeMode="cover"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                }}
              />
              <View>
                <InterMedium className="text-base/5">
                  {property?.seller?.name}
                </InterMedium>
                <View className="flex-row items-center gap-1">
                  <InterRegular className="text-secondaryText text-sm/[150%]">
                    {property?.seller?.isActive ? "Active Now" : "Inactive"}
                  </InterRegular>
                  <View
                    className={`h-2 w-2 ${
                      property?.seller?.isActive ? `bg-green-500` : `bg-red-500`
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

        <View className="w-full">
          <Button
            onPress={() => router.push("/home")}
            isFull
            className="rounded-lg"
          >
            <InterSemiBold className="text-sm/5 text-white">
              Goto Homepage
            </InterSemiBold>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentBooked;
