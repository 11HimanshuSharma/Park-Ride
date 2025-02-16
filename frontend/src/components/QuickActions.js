import PropTypes from 'prop-types';

export function QuickActions({ onBookParking, onBookShuttle }) {
  return `
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="p-5">
        <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
        <div class="mt-4 space-y-4">
          <button id="bookParkingBtn" class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Book Parking
          </button>
          <button id="bookShuttleBtn" class="w-full bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200">
            Book Shuttle
          </button>
        </div>
      </div>
    </div>
  `;
}

QuickActions.propTypes = {
  onBookParking: PropTypes.func.isRequired,
  onBookShuttle: PropTypes.func.isRequired
};