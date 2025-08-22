import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useShedaApi";

export default function AppRouter() {
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing) {
      if (isAuthenticated) {
        // User is logged in, redirect to home
        console.log("🔐 User is authenticated, redirecting to home");
        router.replace("/(tabs)/home");
      } else {
        // User is not logged in, redirect to onboarding
        console.log("🔓 User is not authenticated, redirecting to onboarding");
        router.replace("/");
      }
    }
  }, [isAuthenticated, isInitializing]);

  // Show loading indicator while checking authentication status
  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Don't render anything - we're redirecting based on auth status
  return null;
}
