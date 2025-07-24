"use client"

import { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import InterSemiBold from "@/components/Text/InterSemiBold"
import InterMedium from "@/components/Text/InterMedium"
import InterRegular from "@/components/Text/InterRegular"
import InterExtraBold from "@/components/Text/InterExtraBold"
import Icon from "@/components/common/Icon"
import Button from "@/components/common/Button"
import { DEPOSIT, EYE, EYESLASH, WITHDRAW } from "@/assets/icons"
import WalletTabs from "@/components/organisms/WalletTabs"
import TokensList from "@/components/organisms/TokensList"
import AssetsList from "@/components/organisms/AssetsList"
import TransactionsList from "@/components/organisms/TransactionsList"
import { mockTokens, mockAssets, mockTransactions } from "@/data/wallet"
import type { WalletTab } from "@/types/wallet"

const Wallet = () => {
  const [showBal, setShowBal] = useState(true)
  const [activeTab, setActiveTab] = useState<WalletTab>("Tokens")

  const handleShowBal = () => {
    setShowBal(!showBal)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tokens":
        return <TokensList tokens={mockTokens} />
      case "Transactions":
        return <TransactionsList transactions={mockTransactions} />
      case "Assets":
        return <AssetsList assets={mockAssets} />
      default:
        return <TokensList tokens={mockTokens} />
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="container flex-1 mx-auto max-w-2xl">
        {/* Header */}
        <View className="px-5 py-5 flex-row justify-between">
          <InterSemiBold className="text-lg/5">My Portfolio</InterSemiBold>
          <View>
            <InterMedium>USD</InterMedium>
          </View>
        </View>

        {/* Balance Section */}
        <View className="max-w-64 mx-auto my-9 items-center">
          <View className="flex-row items-center gap-2">
            <InterRegular className="text-sm/5">Total balance</InterRegular>
            <TouchableOpacity onPress={handleShowBal}>
              <View pointerEvents="none">
                {showBal ? (
                  <Icon icon={EYE} width={15} height={15} color="black" />
                ) : (
                  <Icon icon={EYESLASH} width={15} height={15} color="black" />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <InterExtraBold className="text-2xl/5 py-5">{showBal ? "$2,896.02" : "********"}</InterExtraBold>

          <View className="flex-row gap-2">
            <Button isFull={false} color="#d4d4d7" className="flex-row gap-3 items-center justify-center rounded-md">
              <Icon icon={DEPOSIT} width={18} height={16} className="w-0 justify-center items-center bg-[#D8DADC26]" />
              <InterRegular className="text-sm/5">Deposit</InterRegular>
            </Button>
            <Button isFull={false} color="#d4d4d7" className="flex-row gap-3 items-center justify-center rounded-md">
              <Icon icon={WITHDRAW} width={18} height={16} className="w-0 justify-center items-center bg-[#D8DADC26]" />
              <InterRegular className="text-sm/5">Withdraw</InterRegular>
            </Button>
          </View>
        </View>

        {/* Wallet Tabs */}
        <WalletTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <View className="flex-1">{renderTabContent()}</View>
      </View>
    </SafeAreaView>
  )
}

export default Wallet
