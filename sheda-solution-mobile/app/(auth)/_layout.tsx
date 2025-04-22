import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" />
      <Stack.Screen name="signup/index" />
      <Stack.Screen name="forget-pass/index" />
      <Stack.Screen name="otp/index" />
      <Stack.Screen name="pass-changed/index" />
      <Stack.Screen name="reset-pass/index" />
    </Stack>
  );
}