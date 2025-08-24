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

  console.log("🔍 AuthGuard Debug:", {
    isAuthenticated,
    isInitializing,
    requireAuth,
    redirectTo,
  });

  useEffect(() => {
    if (!isInitializing) {
      if (requireAuth && !isAuthenticated) {
        // User needs to be authenticated but isn't
        console.log(
          "🔓 AuthGuard: User not authenticated, redirecting to:",
          redirectTo
        );
        router.replace(redirectTo);
      } else if (!requireAuth && isAuthenticated) {
        // User is authenticated but shouldn't be on this page (e.g., login page)
        console.log("🔐 AuthGuard: User is authenticated, redirecting to home");
        router.replace("/(tabs)/home");
      }
    }
  }, [isAuthenticated, isInitializing, requireAuth, redirectTo]);

  // Show loading indicator while checking authentication status
  if (isInitializing) {
    console.log("⏳ AuthGuard: Still initializing, showing loading...");
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Check if authentication requirements are met
  const shouldRender =
    (requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated);

  console.log("🎯 AuthGuard render decision:", {
    shouldRender,
    requireAuth,
    isAuthenticated,
  });

  if (shouldRender) {
    console.log("✅ AuthGuard: Rendering children");
    return <>{children}</>;
  } else {
    console.log("❌ AuthGuard: Not rendering children (redirect will happen)");
    return null;
  }
}
