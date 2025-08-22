import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { apiService } from "../services/api";
import { useAuth } from "../hooks/useShedaApi";

export function ApiDebug() {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>("");
  const { logout, isAuthenticated, user } = useAuth();

  const testApiConnection = async () => {
    setIsTesting(true);
    setTestResult("");
    try {
      const result = await apiService.testConnection();
      setTestResult(`API Connection: ${result ? "✅ Success" : "❌ Failed"}`);
      console.log("🧪 API Connection test result:", result);
    } catch (error) {
      setTestResult(`API Connection: ❌ Error - ${error}`);
      console.error("🧪 API Connection test error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  const testSignup = async () => {
    setIsTesting(true);
    setTestResult("");
    try {
      const testData = {
        email: `test${Date.now()}@example.com`,
        password: "testpass123",
        username: `testuser${Date.now()}`,
      };
      console.log("🧪 Test signup data:", testData);
      const result = await apiService.signup(testData);
      setTestResult(`Signup: ✅ Success - Check console for details`);
      console.log("🧪 Signup result:", result);
    } catch (error) {
      setTestResult(`Signup: ❌ Error - ${error}`);
      console.error("🧪 Signup test error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  const testLogin = async () => {
    setIsTesting(true);
    setTestResult("");
    try {
      const testCredentials = {
        username: "ajemark0110@hgmail.com",
        password: "11111",
      };

      console.log("🧪 Test credentials:", testCredentials);

      const result = await apiService.login(
        testCredentials.username,
        testCredentials.password
      );
      setTestResult(`Login: ✅ Success - Check console for details`);
      console.log("🧪 Login result:", result);
    } catch (error) {
      setTestResult(`Login: ❌ Error - ${error}`);
      console.error("🧪 Login test error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  const testLogout = async () => {
    setIsTesting(true);
    setTestResult("");
    try {
      await logout();
      setTestResult(`Logout: ✅ Success - User logged out`);
      console.log("🧪 Logout test completed");
    } catch (error) {
      setTestResult(`Logout: ❌ Error - ${error}`);
      console.error("🧪 Logout test error:", error);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        API Debug Tools
      </Text>

      <Text style={{ fontSize: 14, marginBottom: 10, color: "#666" }}>
        Auth Status: {isAuthenticated ? "✅ Logged In" : "❌ Not Logged In"}
      </Text>

      {user && (
        <Text style={{ fontSize: 12, marginBottom: 10, color: "#666" }}>
          User: {user.email || user.username}
        </Text>
      )}

      <TouchableOpacity
        onPress={testApiConnection}
        disabled={isTesting}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          opacity: isTesting ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isTesting ? "Testing..." : "Test API Connection"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testSignup}
        disabled={isTesting}
        style={{
          backgroundColor: "#34C759",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          opacity: isTesting ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isTesting ? "Testing..." : "Test Signup"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testLogin}
        disabled={isTesting}
        style={{
          backgroundColor: "#FF9500",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          opacity: isTesting ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isTesting ? "Testing..." : "Test Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testLogout}
        disabled={isTesting || !isAuthenticated}
        style={{
          backgroundColor: isAuthenticated ? "#FF3B30" : "#999",
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
          opacity: isTesting ? 0.5 : 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isTesting ? "Testing..." : "Test Logout"}
        </Text>
      </TouchableOpacity>

      {testResult ? (
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>{testResult}</Text>
        </View>
      ) : null}

      <Text style={{ fontSize: 12, marginTop: 20, color: "#666" }}>
        Check the browser console for detailed API request/response logs.
      </Text>
    </View>
  );
}
