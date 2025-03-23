import InterBold from "@/components/Text/InterBold";
import InterRegular from "@/components/Text/InterRegular";
import { Text, View, TextInput } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import Button from "@/components/common/Button";
import InterSemiBold from "@/components/Text/InterSemiBold";
import Breaker from "@/components/Breaker";
import Socials from "@/components/Socials";



const Signup = () => {
  const signupSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(5, { message: "Invalid Pasword" }),
  });

  type UserFormType = z.infer<typeof signupSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({ resolver: zodResolver(signupSchema) });

  const onSubmit: SubmitHandler<UserFormType> = (data: UserFormType) => {
    console.log(data);
  };
  return (
    <View className="container mx-auto" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Sign up</InterBold>
      </View>

      <View className="mt-8">
        {/* email input */}
        <View>
          <InterRegular className="p-1 lg:text-2xl">Email address</InterRegular>
          <TextInput
            className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
            placeholder="example@email.com"
            style={{ fontFamily: "Inter-Regular", fontSize: 16 }}
          />
        </View>

        {/* Password input */}
        <View className="my-4">
          <InterRegular className="p-1 lg:text-2xl">Create a password</InterRegular>
          <TextInput
            className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
            style={{ fontFamily: "Inter-Regular", fontSize: 16 }}
            placeholder="must be 8 characters"
          />
        </View>

         {/* Confirm Password input */}
        <View className="my-4">
          <InterRegular className="p-1 lg:text-2xl">Confirm Password</InterRegular>
          <TextInput
            className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
            style={{ fontFamily: "Inter-Regular", fontSize: 16 }}
            placeholder="Repeat password"
          />
        </View>

        <Button className="rounded-lg">
          <InterSemiBold className="text-background text-base lg:text-2xl">
           Sign up
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker />
        </View>
        <Socials />

        <View className="mt-4 flex-row justify-center">
            <Link href={'/(auth)/login'}>
            <InterRegular className="mr-1 lg:text-2xl">Already have an account?</InterRegular>
            <InterBold className="lg:text-2xl">Log in</InterBold>
            </Link>  
        </View>
      </View>
    </View>
  );
};

export default Signup;