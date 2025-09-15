"use client";

// Node.js polyfills for React Native compatibility with crypto libraries
import { Buffer } from "buffer";
import "react-native-get-random-values";

// Essential polyfills
(global as any).Buffer = Buffer;
(global as any).process = (global as any).process || { env: {} };
(global as any).global = global;

// Util polyfill (minimal implementation)
(global as any).util = {
  format: (...args: any[]) => args.join(" "),
  inspect: (obj: any) => JSON.stringify(obj),
  isArray: Array.isArray,
  isBoolean: (val: any) => typeof val === "boolean",
  isNull: (val: any) => val === null,
  isNullOrUndefined: (val: any) => val === null || val === undefined,
  isNumber: (val: any) => typeof val === "number",
  isObject: (val: any) => typeof val === "object" && val !== null,
  isPrimitive: (val: any) => {
    return (
      val === null ||
      typeof val === "boolean" ||
      typeof val === "number" ||
      typeof val === "string" ||
      typeof val === "symbol" ||
      typeof val === "undefined"
    );
  },
  isString: (val: any) => typeof val === "string",
  isSymbol: (val: any) => typeof val === "symbol",
  isUndefined: (val: any) => val === undefined,
  log: console.log,
  deprecate: (fn: any) => fn,
  debuglog: () => () => {},
  error: console.error,
  puts: console.log,
  print: console.log,
  p: console.log,
  exec: () => {},
  pump: () => {},
  inherits: () => {},
  _extend: (target: any, source: any) => Object.assign(target, source),
  TextEncoder: (global as any).TextEncoder,
  TextDecoder: (global as any).TextDecoder,
};

// Minimal stream polyfill
(global as any).stream = {
  Readable: class Readable {},
  Writable: class Writable {},
  Duplex: class Duplex {},
  Transform: class Transform {},
  PassThrough: class PassThrough {},
};

// Minimal events polyfill
(global as any).events = {
  EventEmitter: class EventEmitter {
    private events: { [key: string]: Function[] } = {};

    on(event: string, listener: Function) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }

    emit(event: string, ...args: any[]) {
      if (this.events[event]) {
        this.events[event].forEach((listener: Function) => listener(...args));
      }
    }
  },
};

// Crypto polyfill (if not already available)
if (!(global as any).crypto) {
  (global as any).crypto = {
    getRandomValues: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    subtle: {} as any,
  };
}

import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { ModeProvider } from "@/contexts/ModeContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { ApiProvider } from "@/contexts/ApiContext";
import AuthRouter from "@/components/AuthRouter";
import "./../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <ModeProvider>
      <WalletProvider>
        <ApiProvider>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
              <StatusBar
                style="dark"
                backgroundColor="#ffffff"
                translucent={false}
              />
              <AuthRouter />
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="appointment-booked/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="appointment-successful/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="book-appointment/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="change-password/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chat/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="delete-account/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="details/[id]"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="filter/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="notification-setting/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="payment-pin/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="personal-info/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profile/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profile-setting/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="property-agreement/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="property-summary/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="release-payment/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="select-currency/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="support/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="support-feedback/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="wallet-recovery/index"
                  options={{ headerShown: false }}
                />
                {/* New routes for seller document release flow */}
                <Stack.Screen
                  name="release-document/index"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="release-document-pin"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="dcoument-release-succesful"
                  options={{ headerShown: false }}
                />
              </Stack>
            </SafeAreaView>
          </SafeAreaProvider>
        </ApiProvider>
      </WalletProvider>
    </ModeProvider>
  );
}
