import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from "expo-router";


const HeaderBar = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={properties[1].image} style={{flex:1}} resizeMode="cover"/> */}
      <TouchableOpacity
      onPress={() => router.push("/profile")}
      className="w-12 h-full items-center justify-center border border-borderColor rounded-lg"
      accessibilityLabel="Go to profile"
      >
      <Feather name="user" size={24} color="black" />
      </TouchableOpacity>

      

      <View className="border border-borderColor h-full rounded-lg flex-1 justify-center relative">
        <TextInput
        placeholder="Search Property..."
        className="pl-10 h-full"
        />
        <AntDesign name="search1" size={24} color="black" className="absolute left-2"/>
        
      </View>

      <TouchableOpacity 
      onPress={() => router.push("/filter")}
      className="w-12 h-full items-center justify-center border border-borderColor rounded-lg"
      accessibilityLabel="Filter properties">
      <FontAwesome6 name="sliders" size={24} color="black" />
      </TouchableOpacity>
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
