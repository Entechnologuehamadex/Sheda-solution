"use client"

import { Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { SplashScreen } from "expo-router"
import { ModeProvider } from "@/contexts/ModeContext"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter_24pt-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter_24pt-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter_24pt-ExtraLight.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_24pt-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_24pt-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
    "Inter-Thin": require("../assets/fonts/Inter_24pt-Thin.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
    "Sora-Medium": require("../assets/fonts/Sora-Medium.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) {
    return null
  }

  return (
    <ModeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="appointment-booked/index" options={{ headerShown: false }} />
        <Stack.Screen name="appointment-successful/index" options={{ headerShown: false }} />
        <Stack.Screen name="book-appointment/index" options={{ headerShown: false }} />
        <Stack.Screen name="change-password/index" options={{ headerShown: false }} />
        <Stack.Screen name="chat/index" options={{ headerShown: false }} />
        <Stack.Screen name="delete-account/index" options={{ headerShown: false }} />
        <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="filter/index" options={{ headerShown: false }} />
        <Stack.Screen name="notification-setting/index" options={{ headerShown: false }} />
        <Stack.Screen name="payment-pin/index" options={{ headerShown: false }} />
        <Stack.Screen name="personal-info/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile-setting/index" options={{ headerShown: false }} />
        <Stack.Screen name="property-agreement/index" options={{ headerShown: false }} />
        <Stack.Screen name="property-summary/index" options={{ headerShown: false }} />
        <Stack.Screen name="release-payment/index" options={{ headerShown: false }} />
        <Stack.Screen name="select-currency/index" options={{ headerShown: false }} />
        <Stack.Screen name="support/index" options={{ headerShown: false }} />
        <Stack.Screen name="support-feedback/index" options={{ headerShown: false }} />
        <Stack.Screen name="wallet-recovery/index" options={{ headerShown: false }} />
        {/* New routes for seller document release flow */}
        <Stack.Screen name="release-document/index" options={{ headerShown: false }} />
        <Stack.Screen name="release-document-pin" options={{ headerShown: false }} />
        <Stack.Screen name="dcoument-release-succesful" options={{ headerShown: false }} />
      </Stack>
    </ModeProvider>
  )
}
