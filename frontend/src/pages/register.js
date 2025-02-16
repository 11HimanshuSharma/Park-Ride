/** @format */

import { register } from "../auth";

export function renderRegister() {
  const template = `
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 class="text-2xl font-bold text-center text-indigo-600 mb-6">ParkNGo Register</h1>
        <form id="registerForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
            Register
          </button>
        </form>
        <p class="mt-4 text-sm text-gray-600 text-center">
          Already have an account? <a href="/login" class="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = template;

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (register(name, email, password)) {
      window.navigate("/dashboard");
    } else {
      alert("Registration failed. Try again.");
    }
  });
}
