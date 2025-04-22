import { TouchableOpacity, Pressable, View } from "react-native";
import { ARROWBACK } from "@/assets/icons";
import { useRouter } from "expo-router";
import Icon from "./Icon";

const BackBtn = () => {
     
    const router = useRouter()

    return(
        <TouchableOpacity onPress={() => router.back()} className="border w-12 h-12 items-center justify-center border-borderColor rounded-xl">
         <View pointerEvents="none">
          <Icon
          icon={ARROWBACK}
          width={9}
          height={15}
          className=""
          />  
          </View>
        </TouchableOpacity>
    )
}

export default BackBtn;