const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB;

let isConnected = false;

const initializeDatabase = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(mongoURI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

// const initializeDatabase = async () => {
//   await mongoose
//     .connect(mongoURI)
//     .then(() => console.log("Connected to DB."))
//     .catch((error) => console.log("Error connecting to DB", error));
// };

module.exports = { initializeDatabase };
