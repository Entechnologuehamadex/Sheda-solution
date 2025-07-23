import type React from "react"
import { ScrollView } from "react-native"
import AssetCard from "../molecules/AssetCard"
import type { Asset } from "../../types/wallet"

interface AssetsListProps {
  assets: Asset[]
}

const AssetsList: React.FC<AssetsListProps> = ({ assets }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-1 px-2 py-4"
      contentContainerStyle={{ paddingHorizontal: 8 }}
    >
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </ScrollView>
  )
}

export default AssetsList
