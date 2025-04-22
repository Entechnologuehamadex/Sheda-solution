import FeaturedCarousel from "@/components/Carousel";
import HeaderBar from "@/components/HeaderBar";
import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import Button from "@/components/common/Button";
import CategoryList from "@/components/CategoryList";
import { deviceHeight, deviceWidth } from "@/constants/values";
import HouseList from "@/components/HouseList";

const Home = () => {
  return (
    // <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container mx-auto max-w-2xl"
        style={{ padding: 20, height: deviceHeight }}
      >
        <HeaderBar />

        <ScrollView
          horizontal={false}
          className="mt-2 flex-1"
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-3">
            <InterBold className="text-base mb-1">Featured</InterBold>
            <FeaturedCarousel />
          </View>

          <View className="mb-2">
            <View className="flex-row justify-between items-cente mb-1">
              <InterBold className="text-base mb-2">Categories</InterBold>
              <InterRegular className="text-base text-primary">
                See All
              </InterRegular>
            </View>
            <CategoryList />
          </View>

          <View className="mb-2">
            <View className="flex-row justify-between items-cente mb-1">
              <InterBold className="text-base mb-2">
                Nearby Properties
              </InterBold>
              <InterRegular className="text-base text-primary">
                See All
              </InterRegular>
            </View>
            {/* list goes here */}
            <HouseList />
          </View>
        </ScrollView>

       
      </View>
    </SafeAreaView>
  );
};

export default Home;
