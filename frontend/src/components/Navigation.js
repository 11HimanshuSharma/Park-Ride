import PropTypes from 'prop-types';

export function Navigation({ currentPath, userName, onLogout }) {
  return `
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">ParkNGo</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/dashboard" class="border-${currentPath === '/dashboard' ? 'indigo-500 text-gray-900' : 'transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="/booking" class="border-${currentPath === '/booking' ? 'indigo-500 text-gray-900' : 'transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Book Parking
              </a>
              <a href="/shuttle" class="border-${currentPath === '/shuttle' ? 'indigo-500 text-gray-900' : 'transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Shuttle Service
              </a>
            </div>
          </div>
          <div class="flex items-center">
            <span class="text-gray-700 mr-4">${userName}</span>
            <button id="logoutButton" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  `;
}

Navigation.propTypes = {
  currentPath: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};