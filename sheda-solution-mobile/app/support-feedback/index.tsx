import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterSemiBold from "@/components/Text/InterSemiBold";
import BackBtn from "@/components/common/BackBtn";
import InterMedium from "@/components/Text/InterMedium";
import Button from "@/components/common/Button";
import InterRegular from "@/components/Text/InterRegular";
import InterBold from "@/components/Text/InterBold";

const SupportFeedback = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="container flex-1 mx-auto max-w-2xl"
        style={{ padding: 20 }}
      >
        <View className="flex-row items-center gap-4">
          <BackBtn />
          <InterSemiBold className="text-lg/5">Feedback</InterSemiBold>
        </View>

        <View className="mt-7">
          <InterMedium className="text-base/5">
            We’re glad to receive your feedbacks
          </InterMedium>

          <View>
            <InterRegular className="text-xs/5 mb-5">
              Thank you for sharing your thoughts with us! While we may not b
              able to respond individually, be rest assured that your input will
              be looked into adequately.
            </InterRegular>

            <InterRegular className="text-xs/5">
              Need assistance or you have inquiries to make? Visit help center
              or contact us.
            </InterRegular>
          </View>
        </View>

        <View className="mt-14">
            <View className="border border-borderColor rounded-lg h-[141]">
            <TextInput
              placeholder="Type your feedback here"
              multiline
              style={{
                padding: 10,
                fontSize: 12,
                lineHeight: 20,
                color: '#000000BF',
              }} />
            </View>

            <View className="mt-3">
                <Button className="rounded-lg">
                    <InterBold className="text-sm/5 text-white">Submit</InterBold>
                </Button>
            </View>
        </View>

        
      </View>
    </SafeAreaView>
  );
};

export default SupportFeedback;
