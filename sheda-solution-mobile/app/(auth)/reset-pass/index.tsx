import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/textInput";
import { Text, View } from "react-native";
import { Link, router } from "expo-router";

const ResetPass = () => {
  const handlePassChanged = () => {
    router.push({
      pathname: "/pass-changed",
    });
    // setPassword('');
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
        <InterRegular className="py-1 lg:text-2xl">New password</InterRegular>
        <StyledTextInput isPassword={true} placeholder="must be 8 characters" />
      </View>

      {/* Confirm Password input */}
      <View className="my-4">
        <InterRegular className="py-1 lg:text-2xl">
          Confirm new Password
        </InterRegular>
        <StyledTextInput isPassword={true} placeholder="repeat password" />

        <Button className="rounded-lg my-4" onPress={handlePassChanged}>
          <InterSemiBold className="text-background text-base lg:text-2xl">
            Reset password
          </InterSemiBold>
        </Button>

        <Link href={"/login"} className="text-center">
          <InterRegular>Remember password?</InterRegular>
          <InterBold className="text-primary ml-1"> Log in</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default ResetPass;
