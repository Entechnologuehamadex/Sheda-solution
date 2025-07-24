import { View } from "react-native"
import { Button } from "../common/Button"
import { InterSemiBold } from "../Text/InterSemiBold"
import { InterRegular } from "../Text/InterRegular"
import { theme } from "../../styles/theme"

interface ListingSuccessScreenProps {
  onGoToHomepage: () => void
}

export function ListingSuccessScreen({ onGoToHomepage }: ListingSuccessScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* Success Icon */}
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          borderWidth: 3,
          borderColor: "#4CAF50",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: 24,
            height: 12,
            borderLeftWidth: 3,
            borderBottomWidth: 3,
            borderColor: "#4CAF50",
            transform: [{ rotate: "-45deg" }],
            marginTop: -6,
            marginLeft: 3,
          }}
        />
      </View>

      {/* Success Message */}
      <InterSemiBold
        style={{
          fontSize: 20,
          color: theme.colors.text,
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        Listing successful
      </InterSemiBold>

      <InterRegular
        style={{
          fontSize: 16,
          color: theme.colors.textSecondary,
          textAlign: "center",
          lineHeight: 24,
          marginBottom: 40,
        }}
      >
        Your property has been successfully listed on our marketplace, you will get notified whenever you have a
        potential buyer. Cheers!
      </InterRegular>

      {/* Go to Homepage Button */}
      <Button
        title="Got to homepage"
        onPress={onGoToHomepage}
        style={{
          backgroundColor: theme.colors.primary,
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 8,
          minWidth: 200,
        }}
        textStyle={{
          color: "#fff",
          fontSize: 16,
          fontWeight: "600",
        }}
      />
    </View>
  )
}
