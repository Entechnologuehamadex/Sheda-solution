
import { useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterSemiBold from "@/components/Text/InterSemiBold";
import InterMedium from "@/components/Text/InterMedium";
import InterRegular from "@/components/Text/InterRegular";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InterExtraBold from "@/components/Text/InterExtraBold";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { DEPOSIT, EYE, EYESLASH, WITHDRAW } from "@/assets/icons";
import wallet  from "../../../constants/walletHeader";

const Wallet = () => {
  const [showBal, setShowBal] = useState(true);
  const [activeIndex, setActiveIndex] = useState<null| number>(0);
  const handleShowBal = () => {
    setShowBal(!showBal);
  };

  const handleWalletClick = (index : number) =>{
    setActiveIndex(index)
  } 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className="container flex-1 mx-auto max-w-2xl py-5"
        //  style={{ padding: 20 }}
      >
        <View className="px-5 flex-row justify-between">
          <InterSemiBold className="text-lg/5">My Portfolio</InterSemiBold>

          <View>
            <InterMedium>USD</InterMedium>
          </View>
        </View>

        {/* balance */}
        <View className="max-w-64 mx-auto my-9 items-center">
          <View className="flex-row items-center  gap-2">
            <InterRegular className="text-sm/5">Total balance</InterRegular>
            <TouchableOpacity onPress={handleShowBal} className="">
              <View pointerEvents="none">
              {showBal ? (
                <Icon icon={EYE} width={15} height={15} color="black" />
              ) : (
                <Icon icon={EYESLASH} width={15} height={15} color="black" />
              )}

              </View>
            </TouchableOpacity>
          </View>

          <InterExtraBold className="text-2xl/5 py-5">
            {showBal ? "$2,896.02" : "********"}
          </InterExtraBold>

          <View className="flex-row gap-2">
            <Button
              isFull={false}
              color="#d4d4d7"
              className="flex-row gap-3 items-center justify-center rounded-md"
            >
              <Icon
                icon={DEPOSIT}
                width={18}
                height={16}
                className="w-0 justify-center items-center bg-[#D8DADC26]"
              />
              <InterRegular className="text-sm/5">Deposit</InterRegular>
            </Button>
            <Button
              isFull={false}
              color="#d4d4d7"
              className="flex-row gap-3 items-center justify-center rounded-md"
            >
              <Icon
                icon={WITHDRAW}
                width={18}
                height={16}
                className="w-0 justify-center items-center bg-[#D8DADC26]"
              />
              <InterRegular className="text-sm/5">Withdraw</InterRegular>
            </Button>
          </View>
        </View>

        {/* transactions */}
        <View>
          <View className="flex-row flex-1">
            {wallet.map((item, index) => (
              <Button 
              key={index} 
              color=""
              onPress={() => handleWalletClick(index)} 
              className={`w-1/3 h-full items-center py-3 ${index === activeIndex? 'border-b-2' : ""} border-primary`}
              >
                <InterRegular className="text-sm/5">{item}</InterRegular>
              </Button>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
