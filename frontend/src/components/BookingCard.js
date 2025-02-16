/** @format */

import PropTypes from "prop-types";

export function BookingCard({ booking }) {
  return `
    <div class="border-l-4 border-indigo-400 bg-indigo-50 p-4 rounded-r-md">
      <div class="flex justify-between">
        <div>
          <p class="text-sm font-medium text-indigo-700">Spot ${
            booking.parkingSpotId.location
          }</p>
          <p class="text-xs text-gray-500">${new Date(
            booking.startTime
          ).toLocaleString()}</p>
        </div>
        <div class="text-sm font-medium text-indigo-700">
          ₹${booking.totalPrice}
        </div>
      </div>
    </div>
  `;
}

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    parkingSpotId: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["active", "upcoming"]).isRequired,
  }).isRequired,
};
