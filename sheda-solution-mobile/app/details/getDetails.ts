import { properties } from "@/constants/property-mock";
import { HouseCardProps } from "@/components/HouseCard/types";

const getDetails = (id: string): HouseCardProps | null => {
  const property = properties.find((property) => property.id === id);
  if (!property) {
    return null;
  }
  return property;
};
export default getDetails;