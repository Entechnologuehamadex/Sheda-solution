import { View, TouchableOpacity, StyleSheet } from "react-native";
import InterRegular from "@/components/Text/InterRegular";
import { useState } from "react";

interface CheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(!value)}
      className={`flex-row items-center justify-between mb-2 ${className}`}
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
    >
      <InterRegular className="text-primaryText text-sm ml-2">
        {label}
      </InterRegular>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: value ? "#C1272D" : "#fff",
            borderColor: value ? "#C1272D" : "#D1D5DB",
          },
        ]}
      >
        {value && <View style={styles.checkmark} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    borderRadius: 2,
  },
});

export default Checkbox;
