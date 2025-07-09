import { PROFILE, FLAG, LIST, BIN } from "@/assets/icons";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "../../components/common/Icon";
import InterRegular from "../../components/Text/InterRegular";
import { router } from "expo-router";

const InboxMenu : React.FC = () => {

    const menuItems = [
        {
            icon: PROFILE,
            label: "View Seller",
            onPress: () => router.push('/profile'),
        },
        {
            icon: LIST,
            label: "Show listings from this seller",
            onPress: () => console.log("Listings Pressed"),
        },
        {
            icon: FLAG,
            label: "Report this seller",
            onPress: () => console.log("Flagged Pressed"),
        },
        {
            icon: BIN,
            label: "Delete chat",
            onPress: () => console.log("Trash Pressed"),
            className: 'text-red-500',
        },
    ]

    return (
        <View className="w-fit border border-borderColor">
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={item.onPress}
                    className={`flex-row items-center border-b border-borderColor gap-2 py-3 px-[10] ${item.className || ''}`}
                >
                    <Icon icon={item.icon} width={20} height={20} />
                    <View>
                        <InterRegular className={`text-sm/[150%] ${item.className || ''}`}>{item.label}</InterRegular>
                    </View>
                </TouchableOpacity>
            ))}
        </View>

    )
}

export default InboxMenu;