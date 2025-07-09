import { Stack } from "expo-router";

const WalletLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="create-wallet" />
      <Stack.Screen name="import-wallet" />
      <Stack.Screen name="created-successfully" />
    </Stack>
  );
};

export default WalletLayout;
