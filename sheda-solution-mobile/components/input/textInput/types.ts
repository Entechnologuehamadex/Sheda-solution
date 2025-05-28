import { TextInputProps } from "react-native";

export interface StyledTextInputProps extends TextInputProps {
    placeholder?: string;
    isPassword?: boolean;
    label?: string;
    onPress?: () => void;
  }