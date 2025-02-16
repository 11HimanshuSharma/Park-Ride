import PropTypes from 'prop-types';
import { BookingCard } from './BookingCard';

export function BookingsList({ bookings, title }) {
  const bookingsList = bookings.length === 0
    ? '<p class="text-gray-500 mt-2">No bookings found</p>'
    : `<div class="mt-2 space-y-4">
        ${bookings.map(booking => BookingCard({ booking })).join('')}
      </div>`;

  return `
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <h3 class="text-lg font-medium text-gray-900">${title}</h3>
        ${bookingsList}
      </div>
    </div>
  `;
}

BookingsList.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    parkingSpotId: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['active', 'upcoming']).isRequired
  })).isRequired,
  title: PropTypes.string.isRequired
};