import { TouchableOpacity, Pressable, View } from "react-native";
import { HEART, FILLEDHEART } from "@/assets/icons";
import Icon from "./Icon";
import { useState } from "react";

interface FavoriteProps{
    className?: string;
}

const Favorite = ({className}: FavoriteProps) => {
     
    const [favorite, SetFavorite] = useState(false);

    const handleFavorite = () => {
        SetFavorite(!favorite); 
        //logic to add and remove favorite to/from database goes here
    }


    return(
        <TouchableOpacity onPress={handleFavorite} className={`border w-12 h-12 items-center justify-center border-borderColor rounded-xl ${className}`}>
         <View pointerEvents="none">
            {favorite ? (
                <Icon
                icon={FILLEDHEART}
                width={13}
                height={12}
                className=""
                />  
            ) : (
                <Icon
                icon={HEART}
                width={13}
                height={12}
                className=""
                />  
            )}
          </View>
        </TouchableOpacity>
    )
}

export default Favorite;