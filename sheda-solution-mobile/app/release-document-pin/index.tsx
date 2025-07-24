"use client"

import BackBtn from "@/components/common/BackBtn"
import Button from "@/components/common/Button"
import InterBold from "@/components/Text/InterBold"
import InterSemiBold from "@/components/Text/InterSemiBold"
import InterRegular from "@/components/Text/InterRegular"
import { View, StyleSheet, SafeAreaView } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { OtpInput } from "react-native-otp-entry"
import { useState } from "react"

const ReleaseDocumentPin = () => {
  const [otp, setOtp] = useState("")

  const { id, amount } = useLocalSearchParams()
  const propertyId = id

  const handleSubmitPin = () => {
    router.push({
      pathname: "/dcoument-release-succesful",
      params: { otpCode: otp, id: propertyId },
    })
    setOtp("")
  }

  return (
    <SafeAreaView className="container max-w-2xl mx-auto px-5 py-5">
      <View className="mb-5">
        <BackBtn />
      </View>

      <View className="mt-5">
        <InterBold className="text-2xl/[130%]">Enter payment pin</InterBold>
      </View>

      <View className="mt-8">
        <View className="mb-5">
          <InterRegular className="text-sm/[128%] text-secondaryText">
            Enter your payment pin to release documents for this property to the buyer.
          </InterRegular>
        </View>

        <OtpInput
          numberOfDigits={4}
          type="numeric"
          focusColor="#C1272D"
          onFilled={(text) => setOtp(text)}
          textInputProps={{
            accessibilityLabel: "Release document pin",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          }}
        />

        <Button className="rounded-lg my-4 bg-primary" onPress={handleSubmitPin}>
          <InterSemiBold className="text-white text-base">Confirm</InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ReleaseDocumentPin

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    marginVertical: 20,
  },
  pinCodeContainer: {
    width: 71,
    height: 71,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filledPinCodeContainer: {
    backgroundColor: "#D8DADC",
  },
})
