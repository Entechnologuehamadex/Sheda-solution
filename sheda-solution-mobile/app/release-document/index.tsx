import BackBtn from "@/components/common/BackBtn"
import InterSemiBold from "@/components/Text/InterSemiBold"
import { View, SafeAreaView, ScrollView, Image } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import getDetails from "../details/getDetails"
import Icon from "@/components/common/Icon"
import { LOCATION } from "@/assets/icons"
import InterRegular from "@/components/Text/InterRegular"
import InterMedium from "@/components/Text/InterMedium"
import InterExtraLight from "@/components/Text/InterExtraLight"
import totalPaymemt from "../../utilities/totalPayment"
import Button from "@/components/common/Button"

const ReleaseDocument = () => {
  const { id } = useLocalSearchParams()
  const propertyId = id as string
  const property = getDetails(propertyId)

  const totalPay = totalPaymemt(property?.price, property?.damages)

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl px-5 py-5"
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View className="flex-row gap-4 items-center mb-7">
          <BackBtn />
          <InterSemiBold className="text-base/5">Release Document</InterSemiBold>
        </View>

        <View className="border-b border-borderColor pb-4">
          <View className="h-[160px] w-full rounded-lg overflow-hidden">
            <Image source={property?.image} style={{ width: "100%", height: "100%" }} />
          </View>

          <View className="my-3">
            <InterMedium className="text-lg/5 mt-4">{property?.type}</InterMedium>
            <View className="flex-row items-center gap-1 mt-1">
              <Icon icon={LOCATION} width={12} height={16} />
              <InterRegular className="text-sm/5 text-secondaryText mt-1">{property?.location}</InterRegular>
            </View>
          </View>

          <View>
            <InterRegular className="text-sm/5 ">Description</InterRegular>
            <InterRegular className="text-sm/5 text-secondaryText mt-1">{property?.description}</InterRegular>
          </View>

          <View className="mt-3">
            <InterRegular className="text-sm/5 ">Listing duration</InterRegular>
            <InterRegular className="text-sm/5 text-secondaryText mt-1">6 months</InterRegular>
          </View>

          {property?.mode === "rent" && (
            <View>
              <View className="flex-row justify-between mt-3">
                <InterRegular className="text-xs/[150%]">Rent/yr</InterRegular>
                <InterExtraLight className="text-xs/[150%]">N{property.price}.00</InterExtraLight>
              </View>
              <View className="flex-row justify-between mt-3">
                <InterRegular className="text-xs/[150%]">Damages</InterRegular>
                <InterExtraLight className="text-xs/[150%]">N{property.damages}.00</InterExtraLight>
              </View>
            </View>
          )}
        </View>

        <View className="flex-row justify-between mt-3">
          <InterRegular>Total</InterRegular>
          <View className="">
            <InterSemiBold className="text-right">N{totalPay}.00</InterSemiBold>
          </View>
        </View>
        <View className="p-[10px] bg-[#e1e1e1] mt-[86px] rounded-lg">
          <InterMedium className="text-xs/[150%]">
            By pressing “Release documents”, you confirm to transfer the property documents to the buyer. Do you still
            want to proceed?
          </InterMedium>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl py-5 px-5 bg-white border-t border-borderColor">
        <Button
          onPress={() =>
            router.push({
              pathname: "/release-document-pin",
              params: { id: propertyId, amount: totalPay },
            })
          }
          className="rounded-lg bg-primary"
        >
          <InterSemiBold className="text-base/5 text-white">Release documents</InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ReleaseDocument
