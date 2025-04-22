import BackBtn from "@/components/common/BackBtn";
import Button from "@/components/common/Button";
import InterBold from "@/components/Text/InterBold";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterRegular from "@/components/Text/InterRegular";
import StyledTextInput from "@/components/textInput";
import { Text, View } from "react-native";
import { Link, router, } from "expo-router";
import { useState } from "react";

const Signup = () => {

  const [useremail, setUserEmail] = useState('');

  const handleSendCode = () => {
    router.push({
      pathname: '/otp',
      params: { email: useremail},
    })
    setUserEmail('');
  }

  return (
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View className="pt-2">
        <BackBtn/>
      </View>

     
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Forget password</InterBold>
      </View>

      <View className="mt-8">
        <View>
          <InterRegular className="py-1">Email address</InterRegular>
          <StyledTextInput 
          placeholder="Enter your email address"
          value={useremail}
          onChangeText={(text)=> setUserEmail(text)}
          />
        </View>

        <Button 
        className="rounded-lg my-4"
        onPress={handleSendCode}>
          <InterSemiBold className="text-background text-base lg:text-2xl">
            Send code
          </InterSemiBold>
        </Button>
    
    <Link  href={'/login'} className="text-center">
      <InterRegular>Remember password?</InterRegular>
      <InterBold className="text-primary ml-1"> Log in</InterBold>
    </Link>
      </View>
    </View>
  );
};

export default Signup;
