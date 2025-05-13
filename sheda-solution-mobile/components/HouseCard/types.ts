export interface HouseCardProps{
    id: string;
    price: string;
    type: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
    mode: 'rent' | 'buy';
    extras: string[];
    image?: string | {uri: string} | any;
    seller?: {
        name: string;
        phone: string;
        photo: string | {uri: string} | any;
        isActive?: boolean;
        rating?: number | any;
        reviews?: REVIEW[];
    },
    isFavorite?: boolean;
    isSold?: boolean;
    isRented?: boolean;
    isAvailable?: boolean;

}

export interface REVIEW{
        id: string;
        name: string;
        comment: string;
        date: string;
        length: any;
}