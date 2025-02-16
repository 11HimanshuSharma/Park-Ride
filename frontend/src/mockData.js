export const MOCK_PARKING_SPOTS = [
  { id: 1, location: 'Block A', price: 50, isAvailable: true },
  { id: 2, location: 'Block B', price: 40, isAvailable: true },
  { id: 3, location: 'Block C', price: 45, isAvailable: false },
  { id: 4, location: 'Block D', price: 55, isAvailable: true }
];

export const MOCK_BOOKINGS = [
  {
    id: 1,
    userId: 2,
    parkingSpotId: 1,
    startTime: '2024-02-20T10:00:00',
    endTime: '2024-02-20T12:00:00',
    totalPrice: 100,
    status: 'active'
  },
  {
    id: 2,
    userId: 2,
    parkingSpotId: 2,
    startTime: '2024-02-21T14:00:00',
    endTime: '2024-02-21T16:00:00',
    totalPrice: 80,
    status: 'upcoming'
  }
];

export const MOCK_SHUTTLES = [
  {
    id: 1,
    type: 'Cab',
    from: 'Metro Station A',
    to: 'Business District',
    price: 150,
    availableSeats: 4
  },
  {
    id: 2,
    type: 'E-Rickshaw',
    from: 'Metro Station B',
    to: 'Shopping Mall',
    price: 60,
    availableSeats: 6
  }
];