import { ScrollView } from "react-native"
import ActivityCard from "./ActivityCard"
import DonutChart from "./DonutChart"

const SellerActivities = () => {
  const revenueData = [
    {
      label: "Total revenue",
      value: "₦17,500,000",
      color: "#C1272D",
      percentage: 40,
    },
    {
      label: "Rent Collected",
      value: "₦7,500,000",
      color: "#00BCD4",
      percentage: 30,
    },
    {
      label: "Pending Rent",
      value: "₦10,000,000",
      color: "#FFC107",
      percentage: 30,
    },
  ]

  const propertiesData = [
    {
      label: "Total Homes",
      value: 24,
      color: "#C1272D",
      percentage: 50,
    },
    {
      label: "Rented Homes",
      value: 14,
      color: "#00BCD4",
      percentage: 29,
    },
    {
      label: "Vacant homes",
      value: 10,
      color: "#FFC107",
      percentage: 21,
    },
  ]

  const handleViewAllRevenue = () => {
    console.log("View all revenue pressed")
    // Navigate to detailed revenue page
  }

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
      {/* Revenue Card */}
      <ActivityCard title="Revenue" showViewAll={true} onViewAllPress={handleViewAllRevenue}>
        <DonutChart data={revenueData} />
      </ActivityCard>

      {/* Properties Card */}
      <ActivityCard title="Properties">
        <DonutChart data={propertiesData} />
      </ActivityCard>
    </ScrollView>
  )
}

export default SellerActivities
