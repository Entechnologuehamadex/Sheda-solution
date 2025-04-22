import React from "react"
import { ScrollView, Text, View } from "react-native"
import { categories } from "@/constants/categories-mock"
import InterRegular from "./Text/InterRegular"

const CategoryList = () => {
    return (
        <ScrollView horizontal className="">
            {categories?.map((category) => (
              <View key={category.id} >
                 <InterRegular className="bg-[#C1272D0A] px-4 py-2 rounded-lg ml-2 text-secondaryText">{category.name}</InterRegular>
              </View>
             
              ))}
            </ScrollView>
    )
}
export default CategoryList;