import { View, ScrollView, TextInput } from "react-native";
import { useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MessageCard from "./MessageCard";
import { useApi } from "@/contexts/ApiContext";
import InterRegular from "@/components/Text/InterRegular";

interface Property {
  id: string;
  type: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  mode: string;
  description: string;
  extras: string[];
  image: any;
  seller: {
    name: string;
    phone: string;
    photo: any;
    rating: number;
  };
}

interface MessagesProps {
  isSeller: boolean;
}

const Messages = ({ isSeller }: MessagesProps) => {
  const { chatHistory, getChatHistory, isLoading, error } = useApi();

  useEffect(() => {
    // Load chat history on component mount
    getChatHistory();
  }, [getChatHistory]);

  // Show loading state
  if (isLoading) {
    return (
      <ScrollView className="flex-1">
        <View className="border border-borderColor rounded-[12px] flex-1 justify-center h-[48px] relative my-[10px]">
          <TextInput
            placeholder="Search message"
            className="pl-10 py-3 h-full text-sm text-secondaryText"
            placeholderTextColor="#A0A0A0"
          />
          <AntDesign
            name="search1"
            size={20}
            color="#A0A0A0"
            className="absolute left-3"
            style={{ position: "absolute", left: 12 }}
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <InterRegular className="text-base">Loading messages...</InterRegular>
        </View>
      </ScrollView>
    );
  }

  // Show error state
  if (error) {
    return (
      <ScrollView className="flex-1">
        <View className="border border-borderColor rounded-[12px] flex-1 justify-center h-[48px] relative my-[10px]">
          <TextInput
            placeholder="Search message"
            className="pl-10 py-3 h-full text-sm text-secondaryText"
            placeholderTextColor="#A0A0A0"
          />
          <AntDesign
            name="search1"
            size={20}
            color="#A0A0A0"
            className="absolute left-3"
            style={{ position: "absolute", left: 12 }}
          />
        </View>
        <View className="flex-1 justify-center items-center">
          <InterRegular className="text-base text-red-500">
            Error: {error}
          </InterRegular>
        </View>
      </ScrollView>
    );
  }

  // Use chat history or fallback to mock data
  const messages = chatHistory.length > 0 ? chatHistory.slice(0, 3) : [];

  return (
    <ScrollView className="flex-1">
      <View className="border border-borderColor rounded-[12px] flex-1 justify-center h-[48px] relative my-[10px]">
        <TextInput
          placeholder="Search message"
          className="pl-10 py-3 h-full text-sm text-secondaryText"
          placeholderTextColor="#A0A0A0"
        />
        <AntDesign
          name="search1"
          size={20}
          color="#A0A0A0"
          className="absolute left-3"
          style={{ position: "absolute", left: 12 }}
        />
      </View>

      {/* Message list */}
      <View>
        {messages.map((property) => (
          <MessageCard
            key={property.id}
            isSeller={isSeller}
            propertyTitle={property.type}
            lastMessage={`Is this ${property.type} still available?`}
            time="10:15"
            sellerName="Amazing homes" // Placeholder for seller name
            propertyId={property.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Messages;
