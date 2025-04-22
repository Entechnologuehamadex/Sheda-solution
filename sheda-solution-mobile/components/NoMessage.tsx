import { View } from "react-native";
import Icon from "./common/Icon";
import { MESSAGE } from "@/assets/icons";
import InterSemiBold from "./Text/InterSemiBold";
import InterRegular from "./Text/InterRegular";
export const NoMessage = () => {
  return (
    <View className="flex-1 justify-center">
      <View className="items-center">
        <Icon
          icon={MESSAGE}
          width={30}
          height={35}
          className="w-[90] h-[95] justify-center items-center bg-[#D8DADC26] rounded-full"
        />
        <View className="my-4 items-center gap-1">
          <InterSemiBold className="text-lg/5">No new messages</InterSemiBold>
          <InterRegular className="text-base/5 text-secondaryText">
            When you send a message to a user, it will appear here.
          </InterRegular>
          <InterRegular className="text-base/5 text-secondaryText">
           appear here.
          </InterRegular>
        </View>
      </View>
    </View>
  );
};
