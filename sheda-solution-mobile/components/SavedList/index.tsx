import { Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { useApi } from "@/contexts/ApiContext";
import HouseCard from "../HouseCard";
import { HouseCardProps } from "../HouseCard/types";
import Button from "../common/Button";
import InterSemiBold from "../Text/InterSemiBold";
import InterRegular from "../Text/InterRegular";

const SavedList = () => {
  const { properties, getProperties, isLoading, error } = useApi();

  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only fetch once to prevent infinite loop
    if (!hasLoaded.current) {
      getProperties(20, 1);
      hasLoaded.current = true;
    }
  }, []); // Empty dependency array

  if (isLoading) {
    return (
      <View className="flex-row flex-wrap gap-2">
        <InterRegular className="text-base">
          Loading saved properties...
        </InterRegular>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-row flex-wrap gap-2">
        <InterRegular className="text-base text-red-500">
          Error: {error}
        </InterRegular>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-2">
      {properties?.map((house: any) => (
        <View key={house.id} className="w-full lg:w-[49%]">
          <HouseCard house={house} />
        </View>
      ))}
      <View className="w-full mb-9">
        <Button
          className="rounded-lg"
          onPress={() => console.log("see more Clicked!!")}
        >
          <InterSemiBold className="text-background text-base">
            See More
          </InterSemiBold>
        </Button>
      </View>
    </View>
  );
};
export default SavedList;
