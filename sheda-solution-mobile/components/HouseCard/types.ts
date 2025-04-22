export interface HouseCardProps{
    id: string;
    price: string;
    type: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    image?: string | {uri: string} | any;
}