import { View } from "react-native"
import Icon from "./common/Icon"
import { NOPURCHASE } from "@/assets/icons"
import InterSemiBold from "./Text/InterSemiBold"
import InterRegular from "./Text/InterRegular"
import Button from "./common/Button"
import { router } from "expo-router"
export const NoHistory = ({headText}: {headText: any}) => {
    return(

        <View className="flex-1 justify-center">
          <View className="items-center">
            <Icon
              icon={NOPURCHASE}
              width={30}
              height={35}
              className="w-[90] h-[95] justify-center items-center bg-[#D8DADC26] rounded-full"
            />
            <View className="my-4 items-center">
              <InterSemiBold className="text-lg/5">
                You have not made any {headText} history yet...
              </InterSemiBold>
              <InterRegular className="text-base/5 text-secondaryText">
              {headText} purchase will show here
              </InterRegular>
            </View>
            <Button 
            isFull
            className="rounded-md"
            onPress={() => router.push('/(tabs)/home')}
            >
              <InterSemiBold className="text-white text-md">
                Back to homepage
              </InterSemiBold>
            </Button>
          </View>
        </View>
    )
}

