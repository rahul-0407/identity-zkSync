import crypto from "crypto";
import Document from "../models/files.js";
import { ErrorHandler } from "../middlewares/error.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const uploadAndRegister = async (req, res, next) => {
  try {
    const { documentType, name } = req.body;
    const ownerAddress = req.walletAddress;

    if (!req.files || !req.files.image0)
      return next(new ErrorHandler("No file uploaded", 400));

    const file = req.files.image0[0];

    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto", // 'auto' for PDFs, images, etc.
    });

    const fileBuffer = fs.readFileSync(file.path);

    const hash = "0x" + crypto.createHash("sha3-256").update(fileBuffer).digest("hex");

    const fileSize = formatFileSize(file.size);

    const newDoc = new Document({
      hash,
      url: result.secure_url,
      ownerAddress,
      userId:req.userId,
      documentType,
      name,
      fileName: file.originalname,
      size: fileSize,
    });

    await newDoc.save();


    return res.json({
      success: true,
      msg: "File uploaded successfully",
      hash,
      url:result.secure_url,
      docId: newDoc._id,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const { hash } = req.params;

    if (!hash) {
      return next(new ErrorHandler("Document hash is required", 400));
    }

    // Find and delete document
    const deletedDoc = await Document.findOneAndDelete({ hash });

    if (!deletedDoc) {
      return next(new ErrorHandler("Document not found", 404));
    }

    return res.json({
      success: true,
      msg: "Document deleted successfully",
      deletedHash: hash,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

const getDocumentMetadata = async (req, res, next) => {
  try {
    const { hash } = req.params;
    console.log(hash)

    const doc = await Document.findOne({ hash });
    if (!doc) return next(new ErrorHandler("Document not found", 404));

    return res.json({
      success: true,
      metadata: {
        hash: doc.hash,
        ipfsCid: doc.ipfsCid,
        ownerAddress: doc.ownerAddress,
        documentType: doc.documentType,
        name: doc.name,
        fileName: doc.fileName,
        size: doc.size,
        status: doc.status,
        color: doc.color,
        timestamp: doc.timestamp,
      },
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

const getDocumentsByOwner = async (req, res, next) => {
  try {
    const { ownerAddress } = req.params;

    if (!ownerAddress) {
      return next(new ErrorHandler("Owner address is required", 400));
    }

    const documents = await Document.find({ ownerAddress })
      .sort({ timestamp: -1 })
      .select(
        "hash url ownerAddress documentType name fileName size status color timestamp"
      );
      // console.log("hello")

    const formattedDocs = documents.map((doc) => ({
      id: doc._id,
      hash: doc.hash,
      ipfsCid: doc.ipfsCid,
      documentType: doc.documentType,
      name: doc.name,
      fileName: doc.fileName,
      size: doc.size,
      status: doc.status,
      color: doc.color,
      timestamp: doc.timestamp,
    }));

    return res.json({
      success: true,
      documents: formattedDocs,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler(error.message, 500));
  }
};

export {
  uploadAndRegister,
  getDocumentMetadata,
  getDocumentsByOwner,
  deleteDocument,
};
