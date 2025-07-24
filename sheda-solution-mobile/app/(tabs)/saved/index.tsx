import { View, SafeAreaView, ScrollView } from "react-native"
import HeaderBar from "@/components/HeaderBar"
import { deviceHeight } from "@/constants/values"
import SavedList from "@/components/SavedList"
import SellerActivities from "@/components/seller/SellerActivities"
import InterSemiBold from "@/components/Text/InterSemiBold"
import { useMode } from "@/contexts/ModeContext"

const Saved = () => {
  const { isSeller } = useMode()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="container mx-auto max-w-2xl" style={{ padding: 20, height: deviceHeight }}>
        {/* Header */}
        <View className="mb-4">
          <InterSemiBold className="text-lg/5">{isSeller ? "Activity" : "Saved Properties"}</InterSemiBold>
        </View>

        {/* Conditional Content */}
        {isSeller ? (
          <SellerActivities />
        ) : (
          <>
            <HeaderBar />
            <ScrollView
              horizontal={false}
              className="mt-2 flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <SavedList />
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Saved
