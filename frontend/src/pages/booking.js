/** @format */

import { getCurrentUser } from "../auth";

export async function renderBooking() {
  const user = getCurrentUser();
  console.log("mai yha per hu");
  console.log("meri ID", user.userId);

  // Fetch available parking spots from the backend
  let parkingSpots = [];
  try {
    const response = await fetch("http://localhost:5000/api/parking");
    parkingSpots = await response.json();
  } catch (error) {
    console.error("Error fetching parking spots:", error);
  }
  console.log("parkingSpots", parkingSpots);

  const template = `
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-indigo-600">ParkNGo</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/dashboard" class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Dashboard
                </a>
                <a href="/booking" class="text-indigo-600 border-b-2 border-indigo-500 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Book Parking
                </a>
                <a href="/shuttle" class="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium">
                  Shuttle Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white shadow rounded-lg">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Book Parking Spot</h2>
              
              <form id="bookingForm" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Select Parking Spot</label>
                    <select id="location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                      ${
                        parkingSpots.length > 0
                          ? parkingSpots
                              .map(
                                (spot) => `
                          <option value="${spot._id}" data-price="${
                                  spot.price
                                }" ${!spot.isAvailable ? "disabled" : ""}>
                            ${spot.location} - ₹${spot.price}/hr ${
                                  !spot.isAvailable ? "(Occupied)" : ""
                                }
                          </option>
                        `
                              )
                              .join("")
                          : "<option disabled>No available spots</option>"
                      }
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Duration (hours)</label>
                    <input type="number" id="duration" min="1" max="24" value="1" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Start Time</label>
                    <input type="datetime-local" id="startTime" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = template;

  // Set min datetime to current time
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  document.getElementById("startTime").min = now.toISOString().slice(0, 16);

  // Handle booking submission
  document
    .getElementById("bookingForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const selectedSpot = document.getElementById("location");
      const parkingSpotId = selectedSpot.value;
      console.log("parkingSpotId", parkingSpotId);
      const spotPrice = parseFloat(
        selectedSpot.options[selectedSpot.selectedIndex].dataset.price
      );
      const duration = parseInt(document.getElementById("duration").value);
      const startTime = new Date(document.getElementById("startTime").value);
      console.log("startTime", startTime);

      if (!user) {
        alert("You need to be logged in to book a parking spot.");
        return;
      }

      if (!parkingSpotId || duration < 1) {
        alert("Please select a valid parking spot and duration.");
        return;
      }

      // Calculate end time
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + duration);

      // Calculate total price
      const totalPrice = duration * spotPrice;

      try {
        const response = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.userId,
            parkingSpotId,
            startTime,
            endTime,
            totalPrice,
          }),
        });

        if (response.ok) {
          alert(
            "Booking confirmed! You will receive a confirmation email shortly."
          );
          window.location.href = "/dashboard";
        } else {
          const errorData = await response.json();
          alert(`Booking failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error processing booking:", error);
        alert("Something went wrong. Please try again.");
      }
    });
}
