import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Breaker from "@/components/Breaker";
import StyledTextInput from "@/components/textInput";
import Socials from "@/components/Socials";

const Login = () => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(5, { message: "Invalid Pasword" }),
  });

  type UserFormType = z.infer<typeof loginSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({ resolver: zodResolver(loginSchema) });

  // const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
  //   console.log(data);
  //   router.push('/(tabs)')
  // };

  const handleLogin = () => {
    router.push('/(tabs)/home')
  }
  return (
    <View className="container mx-auto max-w-2xl" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Login in</InterBold>
      </View>

      <View className="mt-8">
        <View>
          <InterRegular className="py-1 lg:text-2xl">Email address</InterRegular>
          <StyledTextInput placeholder="useremail@email.com" />
        </View>

        <View className="my-4">
          <InterRegular className="p-y1 lg:text-2xl">Password</InterRegular>
          <StyledTextInput isPassword={true} placeholder="********" />

          <Link className="text-right my-1" href={"/(auth)/forget-pass"}>
            <InterRegular className="text-sm lg:text-2xl">
              Forget password?
            </InterRegular>
          </Link>
        </View>

        <Button className="rounded-lg"
        onPress={handleLogin}
        >
          <InterSemiBold className="text-background text-base lg:text-2xl">
            Log in
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker breakText="Or Login with" />
        </View>
        <Socials />

        <Link href={"/signup"} className="text-center mt-4">
          <InterRegular className="mr-1 lg:text-2xl">
            Don’t have an account?
          </InterRegular>
          <InterBold className="lg:text-2xl"> Sign up</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default Login;
