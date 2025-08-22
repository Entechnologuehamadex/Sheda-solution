import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/hooks/useShedaApi";
import { router } from "expo-router";

export function AuthDebug() {
  const { isAuthenticated, isInitializing, user, logout } = useAuth();

  const testNavigation = () => {
    console.log("🧪 Testing navigation...");
    if (isAuthenticated) {
      console.log("🔐 User is authenticated, navigating to home");
      router.replace("/(tabs)/home");
    } else {
      console.log("🔓 User is not authenticated, navigating to login");
      router.replace("/(auth)/Login");
    }
  };

  const testLogout = async () => {
    console.log("🧪 Testing logout...");
    try {
      await logout();
      console.log("✅ Logout successful");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#f0f0f0", margin: 10 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
        🔍 Auth Debug Panel
      </Text>

      <Text style={{ fontSize: 14, marginBottom: 5 }}>
        isAuthenticated: {isAuthenticated ? "✅ True" : "❌ False"}
      </Text>

      <Text style={{ fontSize: 14, marginBottom: 5 }}>
        isInitializing: {isInitializing ? "⏳ True" : "✅ False"}
      </Text>

      {user && (
        <Text style={{ fontSize: 12, marginBottom: 10, color: "#666" }}>
          User: {user.email || user.username || "Unknown"}
        </Text>
      )}

      <TouchableOpacity
        onPress={testNavigation}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Test Navigation
        </Text>
      </TouchableOpacity>

      {isAuthenticated && (
        <TouchableOpacity
          onPress={testLogout}
          style={{
            backgroundColor: "#FF3B30",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Test Logout
          </Text>
        </TouchableOpacity>
      )}

      <Text style={{ fontSize: 12, color: "#666" }}>
        Check console for detailed logs
      </Text>
    </View>
  );
}
