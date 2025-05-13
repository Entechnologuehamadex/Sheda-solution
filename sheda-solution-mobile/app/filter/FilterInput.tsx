import { useState } from "react";
import { View } from "react-native";
import SelectInput from "@/components/input/selectInput";
import StyledTextInput from "@/components/input/textInput";
import InterMedium from "@/components/Text/InterMedium";
import Checkbox from "@/components/input/checkbox";

interface SelectOption {
  label: string;
  value: string | number;
}

interface FilterInputsProps {
  onSubmit: (filters: {
    location: string;
    apartmentType: string;
    sortBy: string;
    bedrooms: number;
    bathrooms: number;
    minPrice: number;
    maxPrice: number;
    extras: {
      airConditioner: boolean;
      popCeiling: boolean;
      floorTiles: boolean;
      runningWater: boolean;
      furniture: boolean;
      prepaidMeter: boolean;
    };
  }) => void;
  className?: string;
}

const FilterInputs: React.FC<FilterInputsProps> = ({
  onSubmit,
  className = "",
}) => {
  // State for each select input
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedApt, setSelectedApt] = useState<string>("");
  const [selectedSortBy, setSelectedSortBy] = useState<string>("");
  const [selectedBed, setSelectedBed] = useState<number>(0);
  const [selectedBath, setSelectedBath] = useState<number>(0);

   // State for price range
   const [minPrice, setMinPrice] = useState<string>(""); // Default to match image
   const [maxPrice, setMaxPrice] = useState<string>("");

     // State for extras
  const [extras, setExtras] = useState({
    airConditioner: false,
    popCeiling: false,
    floorTiles: false,
    runningWater: false,
    furniture: false,
    prepaidMeter: false,
  });


  // Options for each select input
  const locationOptions: SelectOption[] = [
    { label: "Lekki, Lagos", value: "lekki" },
    { label: "Victoria Island, Lagos", value: "victoria-island" },
    { label: "Ikoyi, Lagos", value: "ikoyi" },
  ];

  const apartmentOptions: SelectOption[] = [
    { label: "Studio", value: "studio" },
    { label: "1 Bedroom", value: "1-bedroom" },
    { label: "2 Bedroom", value: "2-bedroom" },
  ];

  const sortByOptions: SelectOption[] = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest", value: "newest" },
  ];

  const bedroomOptions: SelectOption[] = [
    { label: "Any", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3+", value: 3 },
  ];

  const bathroomOptions: SelectOption[] = [
    { label: "Any", value: 0 },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3+", value: 3 },
  ];

  // handle checkbox change
  const handleExtraChange = (key: keyof typeof extras, value: boolean)  => {
    setExtras((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // Handle form submission
  const handleSubmit = () => {
    onSubmit({
      location: selectedLocation,
      apartmentType: selectedApt,
      sortBy: selectedSortBy,
      bedrooms: selectedBed,
      bathrooms: selectedBath,
      minPrice: parseFloat(minPrice) || 0,
      maxPrice: parseFloat(maxPrice) || Infinity,
      extras,
    });
  };

  return (
    <View className={`w-full ${className}`}>
      <SelectInput
        label="Location"
        options={locationOptions}
        value={selectedLocation}
        onValueChange={(value) => setSelectedLocation(value as string)}
        // placeholder="Lekki Lagos"
      />
      <SelectInput
        label="Apartment Type"
        options={apartmentOptions}
        value={selectedApt}
        onValueChange={(value) => setSelectedApt(value as string)}
        // placeholder="Apartment"
      />
      <SelectInput
        label="Bedrooms"
        options={bedroomOptions}
        value={selectedBed}
        onValueChange={(value) => setSelectedBed(value as number)}
        // placeholder="Any"
      />
      <SelectInput
        label="Bathrooms"
        options={bathroomOptions}
        value={selectedBath}
        onValueChange={(value) => setSelectedBath(value as number)}
        // placeholder="Any"
      />
      <SelectInput
        label="Sort By"
        options={sortByOptions}
        value={selectedSortBy}
        onValueChange={(value) => setSelectedSortBy(value as string)}
        // placeholder="Lowest Price"
      />

    {/* Price Range Section */}
    <View className="mt-1">
        <InterMedium className="text-sm text-secondaryText mb-2">Price range</InterMedium>
        <View className="gap-3 flex-row">
          <View className="w-[49%]">
            <StyledTextInput
              placeholder="Min 20,000"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
            />
          </View>
          <View className="w-[49%]">
            <StyledTextInput
              placeholder="Max 10,000,000"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Extras Section */}
      <View className="mt-4">
        <InterMedium className="text-sm text-secondaryText mb-2">Extras</InterMedium>
        <Checkbox
          label="Air Conditioner"
          value={extras.airConditioner}
          onChange={(value) => handleExtraChange("airConditioner", value)}
        />
        <Checkbox
          label="Pop Ceiling"
          value={extras.popCeiling}
          onChange={(value) => handleExtraChange("popCeiling", value)}
        />
        <Checkbox
          label="Floor Tiles"
          value={extras.floorTiles}
          onChange={(value) => handleExtraChange("floorTiles", value)}
        />
        <Checkbox
          label="Running Water"
          value={extras.runningWater}
          onChange={(value) => handleExtraChange("runningWater", value)}
        />
        <Checkbox
          label="Furniture"
          value={extras.furniture}
          onChange={(value) => handleExtraChange("furniture", value)}
        />
        <Checkbox
          label="Prepaid Meter"
          value={extras.prepaidMeter}
          onChange={(value) => handleExtraChange("prepaidMeter", value)}
        />
      </View>
    </View>
    // </View>
  );
};

export default FilterInputs;
