import type { TextStyle, ViewStyle } from "react-native"

export interface SelectOption {
  label: string
  value: string | number
}

export interface SelectInputProps {
  label?: string
  options: SelectOption[]
  value: string | number
  onValueChange: (value: string | number) => void
  placeholder?: string
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  disabled?: boolean
}
