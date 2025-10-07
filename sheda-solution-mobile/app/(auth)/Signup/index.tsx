import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import { Text, View, TextInput, Alert } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Breaker from "@/components/Breaker";
import Socials from "@/components/Socials";
import StyledTextInput from "@/components/input/textInput";
import { useAuth } from "@/hooks/useShedaApi";
import { useState, useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading, error, clearError, isAuthenticated, user } =
    useAuth();

  const signupSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 8 characters" }),
  });

  type UserFormType = z.infer<typeof signupSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({ resolver: zodResolver(signupSchema) });

  // Handle authentication success
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(auth)/wallet-setup");
    }
  }, [isAuthenticated]);

  // Handle error and success display
  useEffect(() => {
    if (error) {
      Alert.alert("Signup Error", error);
      clearError();
    }
  }, [error, clearError]);

  // Handle successful signup
  useEffect(() => {
    if (isAuthenticated && user) {
      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () =>
            router.push({
              pathname: "/(auth)/wallet-setup",
              params: { email: email },
            }),
        },
      ]);
    }
  }, [isAuthenticated, user, email]);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 5) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    try {
      await signup({
        email,
        password,
        username: email, // Using email as username for now
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Sign up</InterBold>
      </View>

      <View className="mt-8">
        {/* email input */}
        <View>
          <InterRegular className="py-1">Email</InterRegular>
          <StyledTextInput
            placeholder="example@email.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password input */}
        <View className="my-4">
          <InterRegular className="py-1">Create a password</InterRegular>
          <StyledTextInput
            isPassword={true}
            placeholder="must be 8 characters"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Confirm Password input */}
        <View className="my-4">
          <InterRegular className="py-1">Confirm Password</InterRegular>
          <StyledTextInput
            isPassword={true}
            placeholder="repeat password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <Button
          className="rounded-lg"
          onPress={handleSignup}
          disabled={isLoading}
        >
          <InterSemiBold className="text-background text-base">
            {isLoading ? "Creating account..." : "Sign up"}
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker breakText="Or Register with" />
        </View>
        <Socials />

        <Link href={"/(auth)/login"} className="text-center mt-4">
          <InterRegular className="mr-1">Already have an account?</InterRegular>
          <InterBold className=""> Log in</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default Signup;
