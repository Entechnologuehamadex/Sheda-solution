import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useShedaApi";

export default function InitialRouter() {
  const { isAuthenticated, isInitializing } = useAuth();

  console.log("🚀 InitialRouter Debug:", {
    isAuthenticated,
    isInitializing,
  });

  useEffect(() => {
    if (!isInitializing) {
      console.log("🎯 InitialRouter: App initialized, checking auth status...");

      if (isAuthenticated) {
        console.log("🔐 User is authenticated, redirecting to home");
        router.replace("/(tabs)/home");
      } else {
        console.log("🔓 User is not authenticated, staying on onboarding");
        // Don't redirect - let user see onboarding
      }
    }
  }, [isAuthenticated, isInitializing]);

  // Show loading indicator while checking authentication status
  if (isInitializing) {
    console.log("⏳ InitialRouter: Still initializing...");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Don't render anything - this component only handles routing
  return null;
}
