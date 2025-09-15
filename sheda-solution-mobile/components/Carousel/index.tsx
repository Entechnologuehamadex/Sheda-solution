//carousel package documentation at https://rn-carousel.dev/usage

import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text, View, Dimensions, ImageBackground } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Icon from "react-native-vector-icons/MaterialIcons";
import InterBold from "../Text/InterBold";
import totalPayment from "@/utilities/totalPayment";
import { useApi } from "@/contexts/ApiContext";

const deviceWidth = Dimensions.get("window").width; // Get device width

export default function FeaturedCarousel() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue(0);
  const { properties } = useApi();

  // Handle pagination dot press
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      index, // Scroll directly to the clicked index
      animated: true,
    });
  };

  return (
    // <GestureHandlerRootView>
    <GestureHandlerRootView style={{}}>
      <View className=" w-full max-w-2xl mx-auto justify-center items-center">
        {/* Carousel */}
        <Carousel
          ref={ref}
          width={deviceWidth - 40} // Match the width to the design (with padding)
          height={155}
          style={{
            justifyContent: "center",
            alignContent: "center",
            maxWidth: 630,
            borderRadius: 8,
          }}
          // style={{maxWidth: 630, borderWidth: 2,}}
          loop={false}
          data={properties}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress; // Update progress for pagination
          }}
          renderItem={({ item }) => (
            <View className="h-full w-full max-w-[630] mx-auto rounded-lg box-border">
              <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
              >
                <View className="absolute inset-0 bg-black/50 rounded-lg" />

                {/* Overlay content */}
                <View className="flex-1 px-3">
                  {/* Price Tag */}
                  <View className="flex items-end mt-3">
                    <InterBold className="bg-primary text-white text-center h-8 px-3 py-1 rounded-lg text-base">
                      {totalPayment(item.price)}
                    </InterBold>
                  </View>

                  {/* Property Details */}
                  <View className="mt-11">
                    <InterBold className="text-white">{item.type}</InterBold>

                    <View className="flex-row items-center mt-2 gap-2">
                      <View className="flex-row items-center pr-3 border-r border-[#FFFFFF99]">
                        <Icon
                          name="location-on"
                          size={16}
                          color="#FFFFFF99"
                          className="mr-1 p-none"
                        />
                        <Text className="text-[#FFFFFF99]">
                          {item.location}
                        </Text>
                      </View>

                      <View className="flex-row items-center pr-3 border-r border-[#FFFFFF99]">
                        <Icon
                          name="bed"
                          size={16}
                          color="#FFFFFF99"
                          className="mr-1"
                        />
                        <Text className="text-[#FFFFFF99]">
                          {item.bedrooms} Bed
                        </Text>
                      </View>

                      <View className="flex-row items-center pr-3">
                        <Icon
                          name="bathtub"
                          size={16}
                          color="#FFFFFF99"
                          className="mr-1"
                        />
                        <Text className="text-[#FFFFFF99]">
                          {item.bathrooms} Bath
                        </Text>
                      </View>
                    </View>

                    {/* Pagination Dots */}
                    <Pagination.Basic
                      progress={progress}
                      data={properties}
                      dotStyle={{
                        backgroundColor: "#FFFFFF33",
                        borderRadius: 9999,
                        width: 8,
                        height: 8,
                      }}
                      activeDotStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: 9999,
                        width: 8,
                        height: 8,
                      }}
                      containerStyle={{
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 4,
                        marginTop: 15,
                      }}
                      onPress={onPressPagination}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}
