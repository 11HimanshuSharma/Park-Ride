/** @format */

const express = require("express");
const router = express.Router();
const ShuttleBooking = require("../models/ShuttleBooking");

// @route   POST /shuttle/book
// @desc    Book a shuttle service
// @access  Public (No Auth)
router.post("/book", async (req, res) => {
  try {
    const { user, from, to, transportType, pickupTime, price, seatsBooked } =
      req.body;

    if (
      !user ||
      !from ||
      !to ||
      !transportType ||
      !pickupTime ||
      !price ||
      !seatsBooked
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pickupDate = new Date(pickupTime);
    if (isNaN(pickupDate.getTime())) {
      return res.status(400).json({ message: "Invalid pickup time format" });
    }

    const booking = new ShuttleBooking({
      user,
      from,
      to,
      transportType,
      pickupTime: pickupDate,
      price,
      seatsBooked,
    });

    await booking.save();
    res.status(201).json({ message: "Shuttle booked successfully", booking });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /shuttle/bookings
// @desc    Get all shuttle bookings
// @access  Public (No Auth)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await ShuttleBooking.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetching Bookings Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
