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
import StyledTextInput from "@/components/input/textInput";



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
    <View className="container max-w-2xl mx-auto" style={{ padding: 20 }}>
      <View>
        <InterBold className="text-2xl lg:text-4xl mt-16">Sign up</InterBold>
      </View>

      <View className="mt-8">
        {/* email input */}
        <View>
          <InterRegular className="py-1">Email</InterRegular>
          <StyledTextInput 
          placeholder="example@email.com"
          />
        </View>

        {/* Password input */}
        <View className="my-4">
          <InterRegular className="py-1">Create a password</InterRegular>
          <StyledTextInput 
          isPassword={true}
          placeholder="must be 8 characters"
          />
        </View>

         {/* Confirm Password input */}
        <View className="my-4">
          <InterRegular className="py-1">Confirm Password</InterRegular>
          <StyledTextInput 
          isPassword={true}
          placeholder="repeat password"
          />
        </View>

        <Button className="rounded-lg">
          <InterSemiBold className="text-background text-base">
           Sign up
          </InterSemiBold>
        </Button>
      </View>

      <View>
        <View className="py-4">
          <Breaker breakText="Or Register with" />
        </View>
        <Socials />

        <Link href={"/login"} className="text-center mt-4">
          <InterRegular className="mr-1">
            Already have an account?
          </InterRegular>
          <InterBold className=""> Log in</InterBold>
        </Link>
      </View>
    </View>
  );
};

export default Signup;