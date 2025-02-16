/** @format */

const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  location: String,
  price: Number,
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
