import { INBOX, CALL } from "@/assets/icons";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "../../components/common/Icon";
import InterRegular from "../../components/Text/InterRegular";
import { router } from "expo-router";

const SupportMenu : React.FC = () => {

    const supportMenuItems = [
        {
            icon: INBOX,
            label: "Email support",
            onPress: () => console.log("Email support Pressed"),
        },
        {
            icon: CALL,
            label: "Call us",
            onPress: () => console.log("Call us Pressed"),
        },

    ]

    return (
        <View className="w-[208] border border-borderColor bg-white">
            {supportMenuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={item.onPress}
                    className="flex-row items-center border-b border-borderColor gap-2 py-3 px-3"
                >
                    <Icon icon={item.icon} width={20} height={20} />
                    <View>
                        <InterRegular className={`text-sm/[150%]}`}>{item.label}</InterRegular>
                    </View>
                </TouchableOpacity>
            ))}
        </View>

    )
}

export default SupportMenu;