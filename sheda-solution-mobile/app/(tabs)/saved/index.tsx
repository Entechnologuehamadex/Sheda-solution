import { Text, View, SafeAreaView, ScrollView } from "react-native";
import HeaderBar from "@/components/HeaderBar";
import { deviceWidth, deviceHeight } from "@/constants/values";
import SavedList from "@/components/SavedList";


const Saved = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container mx-auto max-w-2xl"
        style={{ padding: 20, height: deviceHeight }}
      >
        <HeaderBar />

        <ScrollView
          horizontal={false}
          className="mt-2 flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <SavedList />
          </ScrollView>
          </View>
          </SafeAreaView>
  );
};

export default Saved;