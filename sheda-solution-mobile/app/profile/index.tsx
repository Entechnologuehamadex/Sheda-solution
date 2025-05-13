import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterSemiBold from "@/components/Text/InterSemiBold";
import BackBtn from "@/components/common/BackBtn";
import { PROFILE } from "@/constants/images-icons";
import InterMedium from "@/components/Text/InterMedium";
import Icon from "@/components/common/Icon";
import { PROFILETICK, CHEVRONRIGHT } from "@/assets/icons";
import Button from "@/components/common/Button";
import InterRegular from "@/components/Text/InterRegular";
import profileList  from "./profileList";


const Profile = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ paddingVertical: 20 }}
      >
        <View className="flex-row items-center gap-4 ml-5">
          <BackBtn />
          <InterSemiBold className="text-lg/5">My Profile</InterSemiBold>
        </View>

        <View className="my-3">
          <View className="px-5 my-2.5 items-center">
            {/* profile image */}
            <View className="justify-center items-center rounded-full overflow-hidden">
              <Image source={PROFILE} style={{ width: 75, height: 75 }} />
            </View>
            {/* profile name section */}
            <View className="mt-3 items-center">
              <View className="flex-row items-center justify-center gap-2">
                <InterMedium className="text-lg/[150%]">
                  Amazing homes
                </InterMedium>
                <Icon icon={PROFILETICK} width={15} height={15} />
              </View>
              <InterRegular className="text-xs/[150%] text-secondaryText">
                Edit Profile
              </InterRegular>
            </View>

            <View className="mt-3">
              <Button className="rounded-lg">
                <InterMedium className="text-white"> Switch to seller accout </InterMedium>
              </Button>
            </View>
          </View>
        </View>

{/* profile list section */}
        <View>  
    {profileList.map((item) => (
      <View
        key={item.id}
        className="flex-row items-center justify-between px-5 py-5 border-b border-[#0000001A]">
        <View className="flex-row items-center gap-3">
          <Icon icon={item.icon} width={20} height={20} />
          <InterMedium className="text-base/[150%]">{item.title}</InterMedium>
          </View>
          {item.chevronRight && (
            <Icon
              icon={CHEVRONRIGHT}
              width={10}
              height={20}
            />
          )}
        </View>
         ))}
      </View>
      </View>
    </SafeAreaView>
  );
};


export default Profile;