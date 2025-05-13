import React from "react";
import { ScrollView, Text, View } from "react-native";
import { categories } from "@/constants/categories-mock";
import InterRegular from "./Text/InterRegular";
import Button from "./common/Button";
import { useState } from "react";

const CategoryList = () => {
  const [activeId, setIsActiveId] = useState<null | number>(1);
  const [activeName, setIsActiveName] = useState<null | string>("all");

  const handleCategoryClick = (id: number, name: string) => {
    setIsActiveId(id);
    setIsActiveName(name);
  };

  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      <View className="flex-row justify-between mt-4">
        {categories?.map((category) => (
          <Button
            key={category.id}
            color={activeId === category.id ? "#C1272D" : "#C1272D0A"}
            onPress={() => handleCategoryClick(category.id, category.name)}
            className="text-white rounded-lg ml-2"
          >
            <InterRegular
              className={
                activeId === category.id ? "text-white" : "text-secondaryText"
              }
            >
              {category.name}
            </InterRegular>
          </Button>
        ))}
      </View>
    </ScrollView>
  );
};
export default CategoryList;
