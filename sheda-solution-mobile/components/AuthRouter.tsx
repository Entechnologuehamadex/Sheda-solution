import React, { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useShedaApi";

export default function AuthRouter() {
  const { isAuthenticated, isInitializing } = useAuth();

  // Handle authentication routing
  useEffect(() => {
    if (!isInitializing) {
      console.log("🎯 AuthRouter: App initialized, checking auth status...");
      console.log("🚀 AuthRouter Debug:", { isAuthenticated, isInitializing });

      if (isAuthenticated) {
        console.log("🔐 User is authenticated, redirecting to home");
        router.replace("/(tabs)/home");
      } else {
        console.log("🔓 User is not authenticated, staying on onboarding");
        // Don't redirect - let user see onboarding
      }
    }
  }, [isAuthenticated, isInitializing]);

  // This component doesn't render anything - it only handles routing
  return null;
}


