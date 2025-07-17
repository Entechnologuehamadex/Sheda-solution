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

const PaymentPin = () => {
  const [otp, setOtp] = useState("")

  const { id, amount, source } = useLocalSearchParams()
  const propertyId = id
  const paymentSource = source // 'history' or 'home'

  //handle submit pin code
  const handleSubmitePin = () => {
    if (paymentSource === "history") {
      // From history tab - go to payment successful
      router.replace({
        pathname: "/payment-successful" as any,
        params: { otpCode: otp, id: propertyId },
      })
    } else {
      // From home tab - go to appointment successful (existing flow)
      router.push({
        pathname: "/appointment-successful",
        params: { otpCode: otp, id: propertyId },
      })
    }
    setOtp("")
  }

  return (
    <SafeAreaView className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View>
        <BackBtn />
      </View>

      <View className="mt-5">
        <InterBold className="text-2xl/[130%]">Enter payment pin</InterBold>
      </View>

      <View className="mt-8">
        <View className="">
          <InterRegular className="text-sm/[128%] text-secondaryText">
            Enter your payment pin to commit a payment of {<InterBold>N{amount}</InterBold>} for this property
          </InterRegular>
        </View>

        <OtpInput
          numberOfDigits={4}
          type="numeric"
          focusColor="#C1272D"
          onFilled={(text) => setOtp(text)} //print the enter values to the console
          textInputProps={{
            accessibilityLabel: "Commit payment pin",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          }}
        />

        <Button className="rounded-lg my-4" onPress={handleSubmitePin}>
          <InterSemiBold className="text-background text-base">Confirm payment</InterSemiBold>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default PaymentPin

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 600,
    marginVertical: 20,
  },
  pinCodeContainer: {
    width: 71,
    height: 71,
  },
  filledPinCodeContainer: {
    color: "green",
    backgroundColor: "#D8DADC",
  },
})
