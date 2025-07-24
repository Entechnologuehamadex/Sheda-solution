import type React from "react"
import { View } from "react-native"
import TabButton from "../atoms/TabButton"
import type { WalletTab } from "../../types/wallet"

interface WalletTabsProps {
  activeTab: WalletTab
  onTabChange: (tab: WalletTab) => void
}

const WalletTabs: React.FC<WalletTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: WalletTab[] = ["Tokens", "Transactions", "Assets"]

  return (
    <View className="flex-row border-b border-gray-200">
      {tabs.map((tab) => (
        <TabButton key={tab} title={tab} isActive={activeTab === tab} onPress={() => onTabChange(tab)} />
      ))}
    </View>
  )
}

export default WalletTabs
