import { ImageSourcePropType } from "react-native";
export interface IconProps {
    source: ImageSourcePropType; // Type for image source
    size?: number; // Optional size prop
    color?: string; // Optional color prop
  }


  export interface Seller {
    name: string;
    phone: string;
    photo: any; // Image source (e.g., require('../path'))
    rating: number;
    isActive: boolean;
    reviews: {
      id: string;
      name: string;
      comment: string;
      date: string;
    }[];
  }
  
  export interface HouseProps {
    id: string;
    price: string;
    type: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    mode?: "buy" | "rent"; 
    description?: string;
    extras?: string[];
    image: any; // Image source
    seller?: Seller;
    isFavorite?: boolean;
    damages?: string; // Added for Active
  }
  
  export interface CancelledHistory {
    id: string;
    image: any;
    type: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    reason: string;
    cancelledDate: string;
    mode?: "buy" | "rent";
  }
  
  export interface HistoryData {
    Ongoing: HouseProps[];
    Active: HouseProps[];
    Cancelled: CancelledHistory[];
    Expired: any[];
  }