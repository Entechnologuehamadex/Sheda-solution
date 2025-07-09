import { View, ScrollView, TextInput, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MessageCard from "./MessageCard";

const Messages = () => {
  return (
    <ScrollView className="">
      <View className="border border-borderColor rounded-[12] flex-1 justify-center h-[48] relative my-[10]">
        <TextInput placeholder="Search message" className="pl-10 py-3 h-full" />
        <AntDesign
          name="search1"
          size={24}
          color="black"
          className="absolute left-2"
        />
      </View>

      {/* Message list */}
      <View>
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </View>
    </ScrollView>
  );
};

export default Messages;
