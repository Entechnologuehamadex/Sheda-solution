import { View, Text, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyledTextInputProps } from "./types";
import { useState } from "react";

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  placeholder,
  isPassword = false,
  onPress,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassVisible = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <View className="w-full relative">
      <TextInput
        className="w-full border py-4 border-borderColor rounded-lg text-primaryText px-4"
        style={{ fontFamily: "Inter-Regular", fontSize: 12 }}
        placeholder={placeholder}
        secureTextEntry= {isPassword && !showPassword}
        onPress={onPress}
        {...props}
      />
      {isPassword && (
        <TouchableOpacity className="absolute right-3 top-1/2 -translate-y-1/2" onPress={togglePassVisible}>
            {showPassword? (<FontAwesome name="eye" size={24} color="black" />) : (<FontAwesome name="eye-slash" size={24} color="black" />)}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StyledTextInput;
