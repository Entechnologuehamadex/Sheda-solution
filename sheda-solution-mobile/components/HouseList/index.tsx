import { Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { useApi } from "@/contexts/ApiContext";
import HouseCard from "../HouseCard";
import { HouseCardProps } from "../HouseCard/types";
import Button from "../common/Button";
import InterSemiBold from "../Text/InterSemiBold";
import InterRegular from "../Text/InterRegular";

const HouseList = () => {
  const { properties, getProperties, isLoading, error } = useApi();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only fetch once to prevent infinite loop
    if (!hasLoaded.current) {
      console.log("🏠 HouseList: Fetching properties...");
      getProperties(20, 1);
      hasLoaded.current = true;
    }
  }, []); // Empty dependency array

  // Log properties data to see what we're getting
  useEffect(() => {
    if (properties && properties.length > 0) {
      console.log("🏠 HouseList: Properties loaded:", properties.length);
      console.log(
        "🏠 HouseList: Property IDs:",
        properties.map((p) => ({ id: p.id, type: typeof p.id }))
      );
    }
  }, [properties]);

  if (isLoading) {
    return (
      <View className="flex-row flex-wrap gap-2">
        <InterRegular className="text-base">Loading properties...</InterRegular>
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
    </View>
  );
};

export default HouseList;
