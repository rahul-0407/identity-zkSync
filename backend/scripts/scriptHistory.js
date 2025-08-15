import mongoose from "mongoose";
import Verification from "../models/verification.js";
import dotenv from "dotenv";

dotenv.config();

const baseOwnerAddress = "0xF8C85DddaAfE76E46593Cc565011716A31192B97";

const ownerNames = [
  "Rahul Gupta",
  "Sneha Sharma",
  "Amit Singh",
  "Priya Patel",
  "Karan Verma",
  "Anita Joshi",
  "Vikram Rao",
  "Neha Mehta",
  "Rohit Kumar",
  "Sonal Agarwal"
];

// Tweak owner address by replacing last 4 hex digits with index
function tweakOwnerAddress(base, index) {
  return base.slice(0, -4) + index.toString(16).padStart(4, "0");
}

// Pick a random name from ownerNames
function getRandomOwnerName() {
  return ownerNames[Math.floor(Math.random() * ownerNames.length)];
}

async function seedVerifications() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "SSI" });
    console.log("Connected to MongoDB");

    // Optional: clear existing verifications for this base address prefix
    await Verification.deleteMany({ ownerAddress: { $regex: `^${baseOwnerAddress.slice(0, -4)}` } });

    const verifications = [];

    for (let i = 0; i < 35; i++) {
      verifications.push({
        ownerAddress: tweakOwnerAddress(baseOwnerAddress, i),
        ownerName: getRandomOwnerName(),
        // verifiedAt will default to now
      });
    }

    const result = await Verification.insertMany(verifications);
    console.log(`✅ Inserted ${result.length} verification records`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding verifications:", error);
    process.exit(1);
  }
}

seedVerifications();
