/** @format */

const API_BASE_URL = "http://localhost:5000/api/users"; // Replace with your backend URL

export async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Login failed:", data.message);
      return false;
    }
    console.log(data);

    console.log("User logged in:", data.userId); // ✅ Print user ID in console

    localStorage.setItem("currentUser", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
}

export function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}

export function checkAuth() {
  const currentPath = window.location.pathname;
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user && currentPath !== "/login") {
    window.location.href = "/login";
    return null;
  }

  return user;
}

export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user && user.token ? user : null;
}
