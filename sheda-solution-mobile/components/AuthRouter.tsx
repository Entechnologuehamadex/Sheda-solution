import React, { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useShedaApi";

export default function AuthRouter() {
  const { isAuthenticated, isInitializing } = useAuth();

  // Handle authentication routing
  useEffect(() => {
    if (!isInitializing) {
      if (isAuthenticated) {
        router.replace("/(tabs)/home");
      } else {
        // Don't redirect - let user see onboarding
      }
    }
  }, [isAuthenticated, isInitializing]);

  // This component doesn't render anything - it only handles routing
  return null;
}
