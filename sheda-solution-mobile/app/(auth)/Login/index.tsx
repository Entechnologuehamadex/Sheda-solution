import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Breaker from "@/components/Breaker";
import StyledTextInput from "@/components/input/textInput";
import Socials from "@/components/Socials";
import { useAuth } from "@/hooks/useShedaApi";
import { useState, useEffect } from "react";
import { showAlert } from "@/components/common/CrossPlatformAlert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError, isAuthenticated, user } =
    useAuth();

  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(5, { message: "Invalid Password" }),
  });

  type UserFormType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({ resolver: zodResolver(loginSchema) });

  // Handle authentication success
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/(tabs)/home");
    }
  }, [isAuthenticated]);

  // Handle error and success display
  useEffect(() => {
    if (error) {
      showAlert("Login Error", error);
      clearError();
    }
  }, [error, clearError]);

  // Handle successful authentication
  useEffect(() => {
    if (isAuthenticated && user) {
      showAlert("Success", "Login successful!", [
        {
          text: "OK",
          onPress: () => router.push("/(tabs)/home"),
        },
      ]);
    }
  }, [isAuthenticated, user]);

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert("Error", "Please enter both email and password");
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <View className="container mx-auto max-w-2xl" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Login in</InterBold>
      </View>

      <View className="mt-8">
        <View>
          <InterRegular className="py-1">Email address</InterRegular>
          <StyledTextInput
            placeholder="useremail@email.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="my-4">
          <InterRegular className="p-y1">Password</InterRegular>
          <StyledTextInput
            isPassword={true}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
          />

          <Link className="text-right my-1" href={"/(auth)/forget-pass"}>
            <InterRegular className="text-sm">Forget password?</InterRegular>
          </Link>
        </View>

        <Button
          className="rounded-lg"
          onPress={handleLogin}
          disabled={isLoading}
        >
          <InterSemiBold className="text-background text-base">
            {isLoading ? "Signing in..." : "Log in"}
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker breakText="Or Login with" />
        </View>
        <Socials />

        <Link href={"/Signup"} className="text-center mt-4">
          <InterRegular className="mr-1">Don’t have an account?</InterRegular>
          <InterBold className=""> Sign up</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default Login;
