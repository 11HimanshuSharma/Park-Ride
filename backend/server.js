/** @format */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/User");
require("./models/ParkingSpot");
require("./models/Booking");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Parking Booking System API is running...");
});

app.get("/test-db", async (req, res) => {
  try {
    const testUser = await new (require("./models/User"))({
      name: "John Doe",
      email: "john@example.com",
      password: "securepassword",
    }).save();

    res.json({ message: "Test user added!", user: testUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/api/parking", require("./routes/parkingRoutes"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

const shuttleRoutes = require("./routes/shuttle");
app.use("/shuttle", shuttleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
