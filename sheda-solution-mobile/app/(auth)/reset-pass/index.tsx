import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/input/textInput";
import { Text, View, Alert } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useShedaApi";

const ResetPass = () => {
  const { otpCode } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, error, clearError } = useAuth();

  // Handle error display
  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      clearError();
    }
  }, [error, clearError]);

  const handlePassChanged = async () => {
    // Validate password
    if (!password || password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await resetPassword(password);
      router.push({
        pathname: "/pass-changed",
      });
    } catch (error) {
      console.error("Password reset failed:", error);
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
          onPress={handlePassChanged}
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
