import { SafeAreaView, View } from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import Icon from "@/components/common/Icon";
import { SUCCESSFUL } from "@/assets/icons";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";

const AppointmentSuccessful = () => {
  const { id } = useGlobalSearchParams();
  const propertyId = id;

  return (
    <SafeAreaView
      className="container flex-1 max-w-2xl mx-auto"
      style={{ padding: 20 }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="w-24 h-24 bg-[#D8DADC26] rounded-full justify-center items-center">
          <Icon icon={SUCCESSFUL} width={35} height={35} />
        </View>
        <View className="my-4">
          <InterSemiBold className="text-base/5 mb-1 text-center">
            Commitment successful
          </InterSemiBold>
          <InterRegular className="text-sm/5 text-center text-secondaryText">
            Your funds will be locked with us until both you and the seller
            agree to release.
          </InterRegular>
        </View>

        <View className="w-full">
          <Button
            onPress={() =>
              router.push({
                pathname: "/book-appointment",
                params: { id: propertyId },
              })
            }
            isFull
            className="rounded-lg"
          >
            <InterSemiBold className="text-sm/5 text-white">
              Book an appointment
            </InterSemiBold>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentSuccessful;
