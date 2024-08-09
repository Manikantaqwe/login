const mongoose = require('mongoose');

const uri = "mongodb:// 205.254.169.0/mongodb"; // Your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

module.exports = connectDB;
