/** @format */

const express = require("express");
const ParkingSpot = require("../models/ParkingSpot");

const router = express.Router();

// @route   POST /api/parking
// @desc    Add a new parking spot
// @access  Public
router.post("/", async (req, res) => {
  const { location, price } = req.body;

  if (!location || !price) {
    return res.status(400).json({ message: "Location and price are required" });
  }

  try {
    const newSpot = new ParkingSpot({ location, price });
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/parking
// @desc    Get all available parking spots
// @access  Public
router.get("/", async (req, res) => {
  try {
    const spots = await ParkingSpot.find({ isAvailable: true });
    res.json(spots);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/parking/:id
// @desc    Update a parking spot (availability, price, etc.)
// @access  Public
router.put("/:id", async (req, res) => {
  const { price, isAvailable } = req.body;

  try {
    const spot = await ParkingSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    if (price !== undefined) spot.price = price;
    if (isAvailable !== undefined) spot.isAvailable = isAvailable;

    await spot.save();
    res.json(spot);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/parking/:id
// @desc    Delete a parking spot
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const spot = await ParkingSpot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ message: "Parking spot not found" });
    }

    await spot.deleteOne();
    res.json({ message: "Parking spot deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
