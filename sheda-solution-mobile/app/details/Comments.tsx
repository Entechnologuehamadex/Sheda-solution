import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import InterRegular from "@/components/Text/InterRegular";
import InterBold from "@/components/Text/InterBold";
import { REVIEW } from "@/components/HouseCard/types";
const Comments = ( {reviews } : {reviews: REVIEW[]}) => {
  const [showMore, setShowMore] = useState(true);

  return (
    <View>
      {!showMore ? (
        <View className="bg-[#00000008] rounded-lg p-2">
          <InterRegular className="text-xs/[150%]">
            {reviews[0].comment}
          </InterRegular>
          <InterRegular className="text-right text-xs/[150%] text-secondaryText">
            {reviews[0].date}
          </InterRegular>
        </View>
      ) : (
        <View className="gap-2">
          {reviews.map((review) => (
            <View key={review.id} className="bg-[#00000008] rounded-lg p-2 gap-2">
                <InterBold>{review.name}</InterBold>
              <InterRegular className="text-sm/[150%] italic">
                {review.comment}
              </InterRegular>
              <InterRegular className="text-right text-xs/[150%] text-secondaryText">
                {review.date}
              </InterRegular>
            </View>
          ))}
        </View>
      )}

<View className="mt-2 items-end">
      <TouchableOpacity onPress={()=>setShowMore(!showMore)}>
        <InterRegular className="text-primary">{!showMore? "Show More" : "Show Less"}</InterRegular>
      </TouchableOpacity>
</View>
    </View>
  );
};

export default Comments;
