/** @format */

import { MOCK_SHUTTLES } from "../mockData";
import { getCurrentUser } from "../auth";

export async function renderShuttle() {
  const user = getCurrentUser();
  console.log("mai yha per hu");
  console.log("Current user:", user);

  let userBookings = [];
  console.log("Fetching bookings for user:", user.userId);

  try {
    const response = await fetch(`http://localhost:5000/shuttle/bookings`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    if (response.ok) {
      userBookings = await response.json();
      console.log("User bookings fetched:", userBookings);
    } else {
      console.error("Unexpected response, status:", response.status);
      const responseBody = await response.text();
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  console.log("User bookings:", userBookings);

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
                <a href="/dashboard" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a href="/booking" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Book Parking
                </a>
                <a href="/shuttle" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Book Shuttle Service</h2>
              
              <form id="shuttleForm" class="space-y-6">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">From</label>
                    <select id="from" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                      <option value="">Select pickup location</option>
                      ${[...new Set(userBookings.map((s) => s.from))]
                        .map(
                          (location) => `
                        <option value="${location}">${location}</option>
                      `
                        )
                        .join("")}
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">To</label>
                    <select id="to" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                      <option value="">Select destination</option>
                      ${[...new Set(userBookings.map((s) => s.to))]
                        .map(
                          (location) => `
                        <option value="${location}">${location}</option>
                      `
                        )
                        .join("")}
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Transport Type</label>
                    <select id="type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                      <option value="">Select transport type</option>
                      ${[...new Set(userBookings.map((s) => s.transportType))]
                        .map(
                          (type) => `
                        <option value="${type}">${type}</option>
                      `
                        )
                        .join("")}
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Pickup Time</label>
                    <input type="datetime-local" id="pickupTime" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
                    Book Shuttle
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="mt-6 bg-white shadow rounded-lg">
            <div class="p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Available Shuttles</h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                ${userBookings
                  .map(
                    (shuttle) => `
                  <div class="border rounded-lg p-4 border-indigo-200 bg-indigo-50">
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <h4 class="text-sm font-medium text-indigo-700">${shuttle.transportType}</h4>
                      </div>
                      <p class="text-sm text-gray-600">From: ${shuttle.from}</p>
                      <p class="text-sm text-gray-600">To: ${shuttle.to}</p>
                      <p class="text-sm font-medium text-indigo-600">₹${shuttle.price}</p>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
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
  document.getElementById("pickupTime").min = now.toISOString().slice(0, 16);

  document.getElementById("shuttleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const type = document.getElementById("type").value;
    const pickupTime = document.getElementById("pickupTime").value;

    alert(
      "Shuttle booked successfully! You will receive a confirmation email shortly."
    );
    window.navigate("/dashboard");
  });
}
