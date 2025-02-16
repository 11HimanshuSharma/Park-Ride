/** @format */

import { renderLogin } from "./pages/login";
import { renderDashboard } from "./pages/dashboard";
import { renderBooking } from "./pages/booking";
import { renderShuttle } from "./pages/shuttle";
// import { renderRegister } from "./pages/register";

const routes = {
  "/": renderDashboard,
  "/login": renderLogin,
  "/dashboard": renderDashboard,
  "/booking": renderBooking,
  "/shuttle": renderShuttle,
  // "/register": renderRegister,
};

export function initRouter() {
  const app = document.getElementById("app");

  function navigate(path) {
    window.history.pushState({}, "", path);
    handleRoute();
  }

  function handleRoute() {
    const path = window.location.pathname;
    const renderer = routes[path] || routes["/"];
    app.innerHTML = "";
    renderer();
  }

  // Handle navigation
  window.addEventListener("popstate", handleRoute);
  window.navigate = navigate;

  // Initial route
  handleRoute();
}
