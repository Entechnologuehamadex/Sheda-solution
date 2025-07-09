

const properties = [
  {
    id: '1',
    price: '75000000',
    type: '4 Bedroom bungalow',
    location: 'Lekki, Lagos',
    bedrooms: 4,
    bathrooms: 4,
    mode: 'buy',
    description:
      'This is a beautiful 4 bedroom bungalow located in Lekki, Lagos. It has a spacious living room, modern kitchen, and a large backyard.',
    extras: ['Air Conditioning', 'POP Ceiling', 'Funiture', 'Floor Tiles'],
    image: require('../assets/images/apt-1.png'),
    seller: {
      name: 'Yusuf Adesina',
      phone: '07061926019',
      photo: require('../assets/images/my-pic.jpg'),
      rating: 4,
      isActive: true,
      reviews: [
        {
          id: '1',
          name: 'Jane Smith',
          comment: 'Seller is welcoming and nice, also the apartment i got was exactly as described.',
          date: '23/02/2024'
        },
        {
          id: '2',
          name: 'John Doe',
          comment: 'Very professional and reliable.',
          date: '03/01/2025'
        },
      ]
    },

    isFavorite: false,
  },
  {
    id: '2',
    price: '500000',
    damages: '30000',
    type: '3 Bedroom apartment',
    location: 'Ikoyi, Lagos',
    bedrooms: 3,
    bathrooms: 2,
    mode: 'rent',
    description:
      'This is a modern 3 bedroom apartment located in Ikoyi, Lagos. It has a spacious living room, modern kitchen, and a large balcony.',
    extras: ['Air Conditioning', 'POP Ceiling', 'Running Water', 'Funiture', 'Floor Tiles'],
    image: require('../assets/images/apt-2.png'),
    seller: {
      name: 'John Doe',
      phone: '08012345678',
      photo: require('../assets/images/sheda-logo.png'),
      isActive: true,
      rating: 3,
      reviews: [
        {
          id: '1',
          name: 'Jane Smith',
          comment: 'Great service and very helpful.',
          date: '12/01/2024'
        },
        {
          id: '2',
          name: 'John Doe',
          comment: 'Very professional and reliable.',
          date: '03/01/2025'
        },
      ]
    },

    isFavorite: false,
  },
  {
    id: '3',
    price: '120000000',
    type: '5 Bedroom duplex',
    location: 'Victoria Island, Lagos',
    bedrooms: 5,
    bathrooms: 5,
    mode: 'buy',
    description: 'This tastefully furnished modern self-contained apartment is located at km 20, lekki-ajah expressway, 5 minutes drive from moobil filling station.',
    extras: ['Air Conditioning', 'POP Ceiling', 'Running Water', 'Funiture', 'Floor Tiles'],
    image: require('../assets/images/hero.png'),
    seller: {
      name: 'Jane Smith',
      phone: '09098765432',
      rating: 2,
      photo: require('../assets/images/my-pic.jpg'),
      isActive: true,

    },

    isFavorite: true,
  },
  {
    id: '4',
    price: '320000000',
    type: '2 Bedroom duplex',
    location: 'ojota, Lagos',
    bedrooms: 2,
    bathrooms: 2,
    image: require('../assets/images/apt-1.png'),
  },
  {
    id: '5',
    price: '100000000',
    type: '10 Bedroom duplex',
    location: 'Ikorodu, Lagos',
    bedrooms: 10,
    bathrooms: 10,
    image: require('../assets/images/apt-2.png'),
  },
];

export { properties }