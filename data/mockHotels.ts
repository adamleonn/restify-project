// data/mockHotels.ts
import { Hotel } from '@/types';

export const RECOMMENDED_HOTELS: Hotel[] = [
    { id: '1', name: 'Hotel Galaxy', location: 'New York, USA', pricePerDay: 120, rating: 4.8, imageUrl: '/images/hotel1.jpg', discountPercentage: 10 },
    { id: '2', name: 'Mariot INN', location: 'New York, USA', pricePerDay: 100, rating: 4.8, imageUrl: '/images/hotel2.jpg', discountPercentage: 10 },

];

export const NEARBY_HOTELS: Hotel[] = [
    { id: '5', name: 'Golden valley', location: 'New York, USA', pricePerDay: 150, rating: 4.8, imageUrl: '/images/hotel5.jpg', discountPercentage: 10 },
    { id: '6', name: 'Hotel Galaxy', location: 'New York, USA', pricePerDay: 120, rating: 4.8, imageUrl: '/images/hotel1.jpg', discountPercentage: 10 },
];