import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useShedaApi";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: "/(auth)/Login" | "/(auth)/Signup" | "/";
}

export default function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = "/(auth)/Login",
}: AuthGuardProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing) {
      if (requireAuth && !isAuthenticated) {
        // User needs to be authenticated but isn't
        try {
          router.replace(redirectTo);
        } catch (error) {}
      } else if (!requireAuth && isAuthenticated) {
        // User is authenticated but shouldn't be on this page (e.g., login page)
        try {
          router.replace("/(tabs)/home");
        } catch (error) {}
      }
    }
  }, [isAuthenticated, isInitializing, requireAuth, redirectTo]);

  // Show loading indicator while checking authentication status
  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Check if authentication requirements are met
  const shouldRender =
    (requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated);

  if (shouldRender) {
    return <>{children}</>;
  } else {
    return null;
  }
}
