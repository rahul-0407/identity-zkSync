import crypto from "crypto"
import { create } from "ipfs-http-client";
import Document from "../models/files.js";
import { ErrorHandler } from "../middlewares/error.js";
import { timeStamp } from "console";


const auth =
    "Basic " + Buffer.from(process.env.INFURA_PROJECT_ID + ":" + process.env.INFURA_PROJECT_SECRET).toString("base64");

const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
    apiPath: "/api/v0", // <-- important for Infura compatibility
});

function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}


const uploadAndRegister = async (req, res, next) => {

    try {

        const { ownerAddress, documentType, name } = req.body;

        if (!req.files || !req.files.image0) return next(new ErrorHandler("No file uploaded", 400))

        const file = req.files.image0[0];

        const hash = "0x" + crypto.createHash("sha3-256").update(file.buffer).digest("hex");

        // upload to ipfs
        const added = await ipfs.add(file.buffer)
        const ipfsCid = added.path;

        const fileSize = formatFileSize(file.size);

        const newDoc = new Document({
            hash,
            ipfsCid,
            ownerAddress,
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
            ipfsCid,
            docId: newDoc._id
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, msg: error.message })
    }

}

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
            deletedHash: hash
        });

    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error.message, 500));
    }
};




const getDocumentMetadata = async (req, res, next) => {

    try {

        const { hash } = req.params;

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
            }
        });

    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error.message, 500));
    }

}


const getDocumentsByOwner = async (req, res, next) => {
    try {
        const { ownerAddress } = req.params;

        if (!ownerAddress) {
            return next(new ErrorHandler("Owner address is required", 400));
        }

        const documents = await Document.find({ownerAddress}).sort({ timestamp: -1 }).select("hash ipfsCid documentType name fileName size status color timestamp");

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
            documents: formattedDocs
        });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error.message, 500));
    }
};






export { uploadAndRegister, getDocumentMetadata, getDocumentsByOwner,deleteDocument }