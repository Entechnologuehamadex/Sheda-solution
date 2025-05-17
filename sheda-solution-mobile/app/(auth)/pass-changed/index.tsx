import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import InterMedium from "@/components/Text/InterMedium";
import InterSemiBold from "@/components/Text/InterSemiBold";

const PasswordChanged = () => {
  return (
    <View
      className="container flex-1 items-center justify-center max-w-2xl mx-auto"
      style={{ padding: 20 }}
    >
      <View className="items-center">
        <InterBold className="text-2xl">Password changed</InterBold>
        <InterMedium className="text-secondaryText">
          Your password has been changed succesfully
        </InterMedium>
      </View>

      <Button isFull={true} className="rounded-lg mt-4" onPress={() => router.push('/login')}>
          <InterSemiBold className="text-background text-base">
           Back to login
          </InterSemiBold>
        </Button>
    </View>
  );
};

export default PasswordChanged;
