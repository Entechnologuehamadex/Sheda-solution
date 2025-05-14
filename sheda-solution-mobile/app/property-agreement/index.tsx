import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import getDetails from "../details/getDetails";
import Icon from "@/components/common/Icon";
import { LOCATION } from "@/assets/icons";
import InterRegular from "@/components/Text/InterRegular";
import InterMedium from "@/components/Text/InterMedium";
import InterExtraLight from "@/components/Text/InterExtraLight";
import totalPaymemt from "./totalPayment";
import Button from "@/components/common/Button";


const PropertyAgreement = () => {
  // Safely extract id from search params
  const { id } = useLocalSearchParams();
  const propertyId = id; // Handle string | string[]
  let property = getDetails(propertyId as string);

  const totalPay = totalPaymemt(property?.price, property?.damages);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl p-5"
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
        // style={{ paddingVertical: 20 }}
      >
        {/* header */}
        <View className="flex-row gap-4 items-center">
          <BackBtn />
          <InterSemiBold className="text-base/5">
            Property Agreement
          </InterSemiBold>
        </View>

        <View className="mt-7 border-b border-borderColor pb-4">
          <View className="h-[160] w-full rounded-lg overflow-hidden">
            <Image
              source={property?.image}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <View className="my-3">
            <InterMedium className="text-lg/5 mt-4">
              {property?.type}
            </InterMedium>
            <View className="flex-row items-center gap-1 mt-1">
              <Icon icon={LOCATION} width={12} height={16} />
              <InterRegular className="text-sm/5 text-secondaryText mt-1">
                {property?.location}
              </InterRegular>
            </View>
          </View>

          <View>
            <InterRegular className="text-sm/5 ">Description</InterRegular>
            <InterRegular className="text-sm/5 text-secondaryText mt-1">
              {property?.description}
            </InterRegular>
          </View>

          <View className="mt-3">
            <InterRegular className="text-sm/5 ">Listing duration</InterRegular>
            <InterRegular className="text-sm/5 text-secondaryText mt-1">
              duration placeholder
            </InterRegular>
          </View>

          {property?.mode === "rent" && (
            <View>
              <View className="flex-row justify-between mt-3">
                <InterRegular className="text-xs/[150%]">Rent/yr</InterRegular>
                <InterExtraLight className="text-xs/[150%]">
                  {property.price}
                </InterExtraLight>
              </View>
              <View className="flex-row justify-between mt-3">
                <InterRegular className="text-xs/[150%]">Damages</InterRegular>
                <InterExtraLight className="text-xs/[150%]">
                  {property.damages}
                </InterExtraLight>
              </View>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mt-3">
          <InterRegular>Total</InterRegular>
          <View className="">
            <InterSemiBold className="text-right">N{totalPay}</InterSemiBold>
            <InterRegular className="text-xs/[150%] text-secondaryText">
              Available: Act bal placeholder
            </InterRegular>
          </View>
        </View>
        
        <View className="mt-24">
          <Button 
          onPress={()=> router.push('/select-currency')}
           className="rounded-lg">
            <InterRegular className="text-base/5 text-white">Commit payment</InterRegular>
          </Button>
          <Button color="white" className="border border-borderColor rounded-lg">
          <InterRegular className="text-base/5 text-secondaryText">Book an appointment</InterRegular>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyAgreement;
