import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Icon from "./common/Icon";
import { PROFILE, SEARCH, SETTING } from "@/assets/icons";

const HeaderBar = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={properties[1].image} style={{flex:1}} resizeMode="cover"/> */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        className="w-12 h-full items-center justify-center border border-borderColor rounded-lg"
        accessibilityLabel="Go to profile"
      >
        <View pointerEvents="none">
          <Icon icon={PROFILE} width={12} height={18} />
        </View>
      </TouchableOpacity>

      <View className="border border-borderColor h-full rounded-lg flex-1 justify-center relative">
        <TextInput placeholder="Search Property..." className="pl-10 h-full" />
        <View className="absolute left-2">
          <Icon icon={SEARCH} width={18} height={18} />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/filter")}
        className="w-12 h-full items-center justify-center border border-borderColor rounded-lg"
        accessibilityLabel="Filter properties"
      >
        <View pointerEvents="none">
          <Icon icon={SETTING} width={16} height={16} />
        </View>
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
