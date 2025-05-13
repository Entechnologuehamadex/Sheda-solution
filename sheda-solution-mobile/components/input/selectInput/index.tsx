import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InterMedium from "@/components/Text/InterMedium";
import { SelectInputProps, SelectOption } from "./type";
import InterRegular from "../../Text/InterRegular";


// interface SelectOption {
//   label: string;
//   value: string | number;
// }

// interface StyledSelectInputProps {
//   label: string;
//   options: SelectOption[];
//   value: string | number;
//   onValueChange: (value: string | number) => void;
//   placeholder?: string;
//   className?: string;
// }

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className = "",
}) => {
  return (
    <View className={`w-full mb-2 ${className}`}>
      <InterMedium className="text-sm mb-1">{label}</InterMedium>
      <View className="w-full h-[48] justify-center border border-borderColor rounded-lg">
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{
            fontFamily: "Inter-Regular",
            // height: "100%",
            paddingVertical: 16,
            paddingHorizontal: 16,
            fontSize: 12,
           backgroundColor: "transparent",
            // color: "#1F2A44", 
          }}
          accessibilityLabel={label}
          accessibilityHint={`Select ${label.toLowerCase()}`}
        >
          {placeholder && (
            <Picker.Item label={placeholder} value="" enabled={false} />
          )}
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default SelectInput;