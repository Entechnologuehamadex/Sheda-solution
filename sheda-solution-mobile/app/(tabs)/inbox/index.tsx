import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterSemiBold from "@/components/Text/InterSemiBold";
import { NoMessage } from "@/components/inbox/NoMessage";
import Messages from "@/components/inbox/Messages";

const Inbox = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
         <View
           className="container flex-1 mx-auto max-w-2xl"
           style={{ padding: 20 }}
         >
           <View className="">
          <InterSemiBold className="text-lg/5">Messages</InterSemiBold>
        </View>
          {/* <NoMessage/> */}
          <Messages />

          </View>
          </SafeAreaView>
  );
};

export default Inbox;