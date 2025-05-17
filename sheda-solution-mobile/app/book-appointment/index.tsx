import { SafeAreaView, View, ScrollView } from "react-native";
import InterSemiBold from "@/components/Text/InterSemiBold";
import BackBtn from "@/components/common/BackBtn";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import InterRegular from "@/components/Text/InterRegular";
import Button from "@/components/common/Button";

interface DATE {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

const BookAppointment = () => {

    const { id } = useLocalSearchParams()
    const propertyId = id; 


  // Store the selected date as a string (e.g., "2025-05-16")
  const [selectedDay, setSelectedDay] = useState<string>("");

  return (
    <SafeAreaView
      className="container flex-1 max-w-2xl mx-auto"
      style={{ padding: 20 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row gap-4 items-center">
          <BackBtn />
          <InterSemiBold className="text-base/5">
            Property Summary
          </InterSemiBold>
        </View>

        <View className="mt-5">
          <Calendar
            onDayPress={(day: DATE) => {
              setSelectedDay(day.dateString); // Store the date string (e.g., "2025-05-16")
              console.log("selected day", day.dateString);
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "transparent",
              textSectionTitleColor: "#1F2A44", // primaryText
              selectedDayBackgroundColor: "#C1272D", // primary
              selectedDayTextColor: "#ffffff", // white
              todayTextColor: "#00adf5",
              dayTextColor: "#2d4150",
              textDisabledColor: "#E5E7EB", // secondaryText
            }}
            markedDates={{
              [selectedDay]: {
                selected: true, // Highlight the selected date
                selectedColor: "#C1272D", // Match primary color
              },
            }}
            // style={{
            //   borderWidth: 1,
            //   borderColor: "#E5E7EB", 
            //   borderRadius: 8,
            // }}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl py-5 px-5">
        <Button
          onPress={() => {
            if (!selectedDay) {
              alert("Please select a date before proceeding.");
              return;
            }
            router.push({
              pathname: "/appointment-booked",
              params: { selectedDate: selectedDay, id: propertyId }, // Pass the selected date to the next screen and property
            });
          }}
          className="bg-primary py-4 rounded-lg"
        >
          <InterRegular className="text-base/5 text-white">
            Proceed
          </InterRegular>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointment;
