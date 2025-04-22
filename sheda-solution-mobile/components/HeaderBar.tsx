import { View, StyleSheet, Text, TextInput, ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { properties } from "@/constants/property-mock";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={properties[1].image} style={{flex:1}} resizeMode="cover"/> */}
      <View className="w-12 h-full items-center justify-center border border-borderColor rounded-lg">
      <Feather name="user" size={24} color="black" />
      </View>

      

      <View className="border border-borderColor h-full rounded-lg flex-1 justify-center relative">
        <TextInput
        placeholder="Search Property..."
        className="pl-10 h-full"
        />
        <AntDesign name="search1" size={24} color="black" className="absolute left-2"/>
        
      </View>

      <View className="w-12 h-full items-center justify-center border border-borderColor rounded-lg">
      <FontAwesome6 name="sliders" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    gap: 8,
  },
});

export default HeaderBar;
