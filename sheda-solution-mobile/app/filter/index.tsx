

import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import FilterInputs from "./FilterInput";
import Button from "@/components/common/Button";
import InterRegular from "@/components/Text/InterRegular";
import BackBtn from "@/components/common/BackBtn";
import InterSemiBold from "@/components/Text/InterSemiBold";

const filter = () => {
  const handleSubmit = (filters: {
    location: string;
    apartmentType: string;
    sortBy: string;
    bedrooms: number;
    bathrooms: number;
  }) => {
    console.log("Filter applied:", filters);
    // Implement filtering logic (e.g., update property list in Home)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl py-5"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Filter</InterSemiBold>
        </View>

        <View className="my-6">
          <FilterInputs onSubmit={handleSubmit} />
          <Button
            onPress={() =>
              handleSubmit({
                location: "",
                apartmentType: "",
                sortBy: "",
                bedrooms: 0,
                bathrooms: 0,
              })
            }
            className="mt-4 rounded-lg bg-primary py-4"
          >
            <InterRegular className="text-white text-center">
              Apply Filters
            </InterRegular>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default filter;
