/** @format */

const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const ParkingSpot = require("../models/ParkingSpot");

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Public
router.post("/", async (req, res) => {
  const { userId, parkingSpotId, startTime, endTime, totalPrice } = req.body;

  // Validate ID formats
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(parkingSpotId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid User ID or Parking Spot ID" });
  }

  try {
    const parkingSpot = await ParkingSpot.findById(parkingSpotId);
    if (!parkingSpot || !parkingSpot.isAvailable) {
      return res.status(400).json({ message: "Parking spot is not available" });
    }

    const newBooking = new Booking({
      userId,
      parkingSpotId,
      startTime,
      endTime,
      totalPrice,
    });

    await newBooking.save();

    // Mark the parking spot as unavailable
    parkingSpot.isAvailable = false;
    await parkingSpot.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate("parkingSpotId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/bookings/user/:userId
// @desc    Get bookings by user
// @access  Public
router.get("/user/:userId", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate(
      "parkingSpotId"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking
// @access  Public
router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Booking ID" });
  }

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Mark the parking spot as available again
    const parkingSpot = await ParkingSpot.findById(booking.parkingSpotId);
    if (parkingSpot) {
      parkingSpot.isAvailable = true;
      await parkingSpot.save();
    }

    await booking.deleteOne();
    res.json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
