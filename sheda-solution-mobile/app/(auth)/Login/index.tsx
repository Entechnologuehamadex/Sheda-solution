import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Breaker from "@/components/Breaker";
import SoraBold from "@/components/Text/SoraBold";
import InterExtraBold from "@/components/Text/InterExtraBold";
import Socials from "@/components/Socials";
// import { TextInput } from "react-native-paper";

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

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    console.log(data);
  };
  return (
    <View className="container mx-auto" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Login in</InterBold>
      </View>

      <View className="mt-8">
        <View>
          <InterRegular className="p-1 lg:text-2xl">Email address</InterRegular>
          <TextInput
            className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
            placeholder="useremail@email.com"
            style={{ fontFamily: "Inter-Regular", fontSize: 16 }}
          />
        </View>
        <View className="my-4">
          <InterRegular className="p-1 lg:text-2xl">Password</InterRegular>
          <TextInput
            className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
            style={{ fontFamily: "Inter-Regular", fontSize: 16 }}
          />

          <Link className="text-right my-1" href={"/(auth)/forget-pass"}>
            <InterRegular className="text-sm lg:text-2xl">Forget password?</InterRegular>
          </Link>
        </View>

        <Button className="rounded-lg">
          <InterSemiBold className="text-background text-base lg:text-2xl">
            Log in
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker />
        </View>
        <Socials />

        <View className="mt-4 flex-row justify-center">
            <Link href={'/(auth)/signup'}>
            <InterRegular className="mr-1 lg:text-2xl">Don’t have an account?</InterRegular>
            <InterBold className="lg:text-2xl">Sign up</InterBold>
            </Link>  
        </View>
      </View>
    </View>
  );
};

export default Login;
