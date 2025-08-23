import mongoose from "mongoose";
import Document from "../models/files.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "SSI" });
    console.log("Connected to MongoDB");

    const ownerAddress = "0xF8C85DddaAfE76E46593Cc565011716A31192B97";

    // Clear existing demo docs for this owner
    await Document.deleteMany({ ownerAddress });

    // Demo documents data
    const demoDocs = [
      {
        hash: "0x2e4392a95116a830d89a619657001e8c00710de828bf7d0d9020e70346b931ff",
        url: "https://res.cloudinary.com/dpbaauu9s/image/upload/v1755984284/sdmtowox…",
        ownerAddress,
        userId: "68a765cc00d5ebfe405679ab",
        documentType: "Certificates",
        name: "Degree Certificate",
        fileName: "Screenshot_20250824_025408.png",
        size: "228.18 KB",
        status: "Verified",
        timestamp: new Date("2025-08-23T21:24:44.986Z"),
        color: "from-teal-500 to-emerald-600"
      },
      {
        hash: `0x${(Math.random().toString(16) + "0".repeat(64)).slice(2, 66)}`,
        url: "https://example.com/passport.pdf",
        ownerAddress,
        userId: "68a765cc00d5ebfe405679ab",
        documentType: "Passport",
        name: "Digital Passport",
        fileName: "passport_scan.pdf",
        size: "256 KB",
        status: "Pending",
        timestamp: new Date(),
        color: "from-blue-500 to-indigo-600"
      },
      {
        hash: `0x${(Math.random().toString(16) + "0".repeat(64)).slice(2, 66)}`,
        url: "https://example.com/medical_record.pdf",
        ownerAddress,
        userId: "68a765cc00d5ebfe405679ab",
        documentType: "Health",
        name: "Medical Record",
        fileName: "medical_record.pdf",
        size: "1.2 MB",
        status: "Pending",
        timestamp: new Date(),
        color: "from-pink-500 to-red-600"
      }
      // Add more docs if needed
    ];

    for (const docData of demoDocs) {
      const doc = new Document(docData);
      await doc.save();
    }

    console.log("✅ Demo documents inserted successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding documents:", err);
    process.exit(1);
  }
}

seed();
