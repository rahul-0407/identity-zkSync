import crypto from "crypto";
import { create } from "@web3-storage/w3up-client";
import Document from "../models/files.js";
import { ErrorHandler } from "../middlewares/error.js";

let w3Client;

const initializeW3Client = async () => {
  if (!w3Client) {
    w3Client = await create(); // auth should already be configured
  }
  return w3Client;
};

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export const uploadAndRegister = async (fileBuffer, fileName, userDID, userId) => {
  try {
    const client = await initializeW3Client();

    // ensure upload goes to user's DID space
    await client.setCurrentSpace(userDID);

    // create File object (global in Node 18+)
    const fileObject = new File([fileBuffer], fileName);

    // upload to Web3.Storage
    const cid = await client.uploadFile(fileObject);

    const fileHash = "0x" + crypto.createHash("sha3-256").update(fileBuffer).digest("hex");

    const doc = await Document.create({
      user: userId,
      fileName,
      cid: cid.toString(),
      hash: fileHash,
      did: userDID,
      size: formatFileSize(fileBuffer.length),
      uploadedAt: new Date(),
    });

    return { cid: cid.toString(), hash: fileHash, document: doc };
  } catch (err) {
    console.error("Upload error:", err);
    throw new ErrorHandler(500, "File upload failed");
  }
};
