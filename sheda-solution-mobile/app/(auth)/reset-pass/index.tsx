import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/input/textInput";
import { Text, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useShedaApi";
import { showAlert } from "@/components/common/CrossPlatformAlert";

const ResetPass = () => {
  const { otpCode, email, otpToken } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, error, clearError } = useAuth();

  // Handle error display
  useEffect(() => {
    if (error) {
      showAlert("Error", error);
      clearError();
    }
  }, [error, clearError]);

  const handlePassChanged = async () => {
    console.log("🔘 Reset password button clicked");
    console.log("📝 Password:", password ? "***" : "empty");
    console.log("📝 Confirm Password:", confirmPassword ? "***" : "empty");

    // Validate password
    if (!password || password.length < 8) {
      showAlert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      showAlert("Error", "Passwords do not match");
      return;
    }

    console.log("✅ Validation passed, calling resetPassword...");
    console.log("🔑 OTP Code:", otpCode);
    console.log("🔑 OTP Token:", otpToken);
    console.log("📧 Email:", email);

    if (!email) {
      showAlert("Error", "Email is required for password reset");
      return;
    }

    if (!otpToken) {
      showAlert("Error", "OTP token is required for password reset");
      return;
    }

    try {
      await resetPassword(
        password,
        otpToken as string, // Use otpToken as the otpCode parameter
        email as string
      );
      console.log("✅ Password reset successful, navigating...");
      showAlert("Success", "Password reset successfully!");
      router.push({
        pathname: "/pass-changed",
      });
    } catch (error) {
      console.error("❌ Password reset failed:", error);
      showAlert("Error", "Failed to reset password. Please try again.");
    }
  };

  return (
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View className="pt-2">
        <BackBtn />
      </View>

      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">
          Reset password
        </InterBold>
      </View>

      <View className="mt-8">
        {/* Password input */}
        <InterRegular className="py-1">New password</InterRegular>
        <StyledTextInput
          isPassword={true}
          placeholder="must be 8 characters"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password input */}
      <View className="my-4">
        <InterRegular className="py-1">Confirm new Password</InterRegular>
        <StyledTextInput
          isPassword={true}
          placeholder="repeat password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Button
          className="rounded-lg my-4"
          style={{
            backgroundColor: "#C1272D",
            zIndex: 1000,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          onPress={() => {
            console.log("🔘 Button onPress triggered");
            handlePassChanged();
          }}
          disabled={isLoading}
        >
          <InterSemiBold className="text-background text-base">
            {isLoading ? "Resetting..." : "Reset password"}
          </InterSemiBold>
        </Button>

        <Link href={"/Login"} className="text-center">
          <InterRegular>Remember password?</InterRegular>
          <InterBold className="text-primary ml-1"> Log in</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default ResetPass;
