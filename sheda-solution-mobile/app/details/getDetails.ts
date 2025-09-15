import { properties } from "@/constants/property-mock";
import { HouseCardProps } from "@/components/HouseCard/types";

const getDetails = (id: string | number): HouseCardProps | null => {
  console.log(
    "🔍 getDetails: Looking for property with ID:",
    id,
    "Type:",
    typeof id
  );
  const property = properties.find(
    (property) =>
      property.id === id ||
      property.id === Number(id) ||
      property.id === String(id)
  );
  if (!property) {
    console.log("🔍 getDetails: Property not found in mock data");
    return null;
  }
  console.log("🔍 getDetails: Found property:", property);
  return property;
};
export default getDetails;
