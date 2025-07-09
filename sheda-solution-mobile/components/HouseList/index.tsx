import { Text, View } from "react-native";
import { properties } from "@/constants/property-mock";
import HouseCard from "../HouseCard";
import { HouseCardProps } from "../HouseCard/types";
import Button from "../common/Button";
import InterSemiBold from "../Text/InterSemiBold";

const HouseList = () => {
  return (
    <View className="flex-row flex-wrap gap-2">
      {properties?.map((house: any) => (
        <View key={house.id} className="w-full lg:w-[49%]">
          <HouseCard house={house} />
        </View>
      ))}
      {/* <View className="w-full">
               <Button
                 className="rounded-lg"
                 onPress={() => console.log("see more Clicked!!")}
               >
                 <InterSemiBold className="text-background text-base">
                   See More
                 </InterSemiBold>
               </Button>
             </View> */}
    </View>
  );
};
export default HouseList;
