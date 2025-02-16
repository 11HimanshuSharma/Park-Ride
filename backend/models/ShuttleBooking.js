/** @format */

const mongoose = require("mongoose");

const ShuttleBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    transportType: {
      type: String,
      required: true,
      enum: ["Bus", "Taxi", "Train", "Shuttle"], // Define transport types
    },
    pickupTime: {
      type: Date,
      required: true,
      index: true, // Index for faster search
    },
    price: { type: Number, required: true, min: 1 }, // Prevent negative values
    seatsBooked: { type: Number, required: true, min: 1 }, // Prevent negative values
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShuttleBooking", ShuttleBookingSchema);
