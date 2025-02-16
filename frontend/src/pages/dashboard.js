/** @format */

import { getCurrentUser, logout } from "../auth";
import { Navigation } from "../components/Navigation";
import { BookingsList } from "../components/BookingsList";
import { QuickActions } from "../components/QuickActions";

export async function renderDashboard() {
  console.log("renderDashboard function called");

  const user = getCurrentUser();
  console.log("Current user:", user);

  if (!user) {
    console.log("No user found, navigating to login");
    window.navigate("/login");
    return;
  }

  // getting user information like name, email, etc.
  let userInformation;
  const userResponse = await fetch(
    `http://localhost:5000/api/users/${user.userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  );
  if (userResponse.ok) {
    userInformation = await userResponse.json();
    console.log("User userInformation fetched:", userInformation);
  } else {
    console.error("Unexpected response, status:", userResponse.status);
    const responseBody = await userResponse.text();
    console.error("Response body:", responseBody);
  }
  console.log("userInformation", userInformation);
  let userBookings = [];
  console.log("Fetching bookings for user:", user.userId);

  // getting all booking

  try {
    const response = await fetch(
      `http://localhost:5000/api/bookings/user/${user.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

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

  // Get the current time
  const now = new Date();

  // Ensure bookings have valid time data
  userBookings = userBookings.map((b) => ({
    ...b,
    startTime: new Date(b.startTime),
    endTime: b.endTime
      ? new Date(b.endTime)
      : new Date(new Date(b.startTime).getTime() + b.duration * 60000), // Calculate endTime if missing
  }));

  // Categorize bookings
  const activeBookings = userBookings.filter(
    (b) => b.startTime <= now && b.endTime >= now
  );
  const upcomingBookings = userBookings.filter((b) => b.startTime > now);

  console.log("Active bookings:", activeBookings);
  console.log("Upcoming bookings:", upcomingBookings);

  // Generate UI template
  const template = `
    <div class="min-h-screen bg-gray-50">
        ${Navigation({
          currentPath: "/dashboard",
          userName: userInformation.name,
          onLogout: logout,
        })}

        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    ${
                      activeBookings.length > 0
                        ? BookingsList({
                            bookings: activeBookings,
                            title: "Active Parking",
                          })
                        : "<p>No active bookings found.</p>"
                    }

                    ${
                      upcomingBookings.length > 0
                        ? BookingsList({
                            bookings: upcomingBookings,
                            title: "Upcoming Rides",
                          })
                        : "<p>No upcoming rides found.</p>"
                    }

                    ${QuickActions({
                      onBookParking: () => window.navigate("/booking"),
                      onBookShuttle: () => window.navigate("/shuttle"),
                    })}
                </div>
            </div>
        </div>
    </div>
  `;

  document.getElementById("app").innerHTML = template;

  // Ensure elements exist before adding event listeners
  document.getElementById("logoutButton")?.addEventListener("click", logout);
  document
    .getElementById("bookParkingBtn")
    ?.addEventListener("click", () => window.navigate("/booking"));
  document
    .getElementById("bookShuttleBtn")
    ?.addEventListener("click", () => window.navigate("/shuttle"));
}
