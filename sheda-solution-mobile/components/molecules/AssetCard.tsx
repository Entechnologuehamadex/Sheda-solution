import type React from "react"
import { View, Image } from "react-native"
import InterMedium from "../Text/InterMedium"
import InterRegular from "../Text/InterRegular"
import type { Asset } from "../../types/wallet"

interface AssetCardProps {
  asset: Asset
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  return (
    <View
  className="bg-cardBackground h-fit rounded-xl items-center justify-center p-4 mx-2 my-2 mb-4 border border-gray-200 w-fit"
>

      <View className="w-16 h-16 rounded-lg overflow-hidden mb-3">
        <Image source={asset.image} className="w-full h-full" resizeMode="cover" />
      </View>
      <InterMedium className="text-sm text-black mb-1 whitespace-nowrap">
  {asset.name}
</InterMedium>

      <InterRegular className="text-xs text-gray-500">{asset.status}</InterRegular>
    </View>
  )
}

export default AssetCard
