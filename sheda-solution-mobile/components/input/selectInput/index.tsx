"use client"

import type React from "react"

import { View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import InterMedium from "@/components/Text/InterMedium"
import type { SelectInputProps } from "./type"

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className = "",
  labelStyle,
}) => {
  return (
    <View className={`w-full mb-2 ${className}`}>
      {label && (
        <InterMedium className="text-sm mb-1" style={labelStyle}>
          {label}
        </InterMedium>
      )}
      <View className="w-full h-[48] justify-center border border-borderColor rounded-lg">
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{
            fontFamily: "Inter-Regular",
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 12,
            backgroundColor: "transparent",
          }}
          accessibilityLabel={label || "Select option"}
          accessibilityHint={`Select ${label?.toLowerCase() || "option"}`}
        >
          {placeholder && <Picker.Item label={placeholder} value="" enabled={false} />}
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default SelectInput
