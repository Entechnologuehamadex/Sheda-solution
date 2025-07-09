const historyData = {
  Ongoing: [
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
  ],
  Active: [
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
      }
  ],
  Cancelled: [
    {
      id: 'cancelled-1',
      image: require('../assets/images/apt-1.png'), // You'll need a placeholder image
      type: '1 Bedroom flat',
      location: 'Yaba, Lagos',
      price: '150k/yr',
      bedrooms: 1,
      bathrooms: 1,
      reason: 'Tenant did not meet requirements',
      cancelledDate: '2025-05-10',
    },
    {
      id: 'cancelled-2',
      image: require('../assets/images/apt-2.png'), // Another placeholder image
      type: 'Studio apartment',
      location: 'Surulere, Lagos',
      price: '80k/yr',
      bedrooms: 0,
      bathrooms: 1,
      reason: 'Property owner decided not to rent',
      cancelledDate: '2025-04-25',
    },
  ],
  Expired: [
    {
      id: 'expired-1',
      image: require('../assets/images/apt-2.png'), // Placeholder image
      type: '2 Bedroom apartment',
      location: 'Ikeja, Lagos',
      price: '400k/yr',
      bedrooms: 2,
      bathrooms: 2,
      expiryDate: '2025-05-01',
    },
  ],
};

export { historyData };