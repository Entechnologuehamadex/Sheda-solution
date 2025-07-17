import { View, ImageBackground, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { HERO } from "@/constants/images-icons";
import InterRegular from "@/components/Text/InterRegular";

export default function Onboarding() {
  
  return (
    <View className="flex-1">
      <View className="h-[60%] w-full">
        <ImageBackground
          resizeMode="cover"
          source={HERO}
          className="w-full h-full"
        ></ImageBackground>
      </View>

      <View className="flex-1 bg-background rounded-t-2xl lg:rounded-t-none -mt-5 lg:mt-none p-5">
        <View className="mt-5 flex items-center">
          <InterSemiBold className="text-xl mb-2">Welcome to advanced real estate</InterSemiBold>
          <InterRegular className="text-secondaryText text-base">Sheda solutions makes your real</InterRegular>
          <InterRegular className="text-secondaryText text-base">estate operations very easy and stress-free.</InterRegular>
        </View>

        <View className="mt-8">
          <Button 
          isFull={true}
          className="rounded-lg"
          onPress={() => router.push('/(auth)/login')}
          >
            <InterSemiBold className="text-background">Sign in</InterSemiBold>
          </Button>
          <Button 
          isFull={true} 
          color="tranparent"
          onPress={() => router.push('/(auth)/signup')}
          className="rounded-lg border border-borderColor">
            <InterSemiBold className="">Create account</InterSemiBold>
          </Button>
        </View>
      </View>
    </View>
  );
}
