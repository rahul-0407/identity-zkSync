import express from "express";
import {uploadAndRegister, getDocumentMetadata, getDocumentsByOwner, deleteDocument} from "../controllers/files.js"
import upload from "../middlewares/multer.js"

const fileRouter = express.Router();

fileRouter.post("/uploadFile",upload.fields([{name:'image0',maxCount:1}]),uploadAndRegister)
fileRouter.get("/deleteDocument/:hash",deleteDocument)
fileRouter.get("/metadataByHash/:hash",getDocumentMetadata)
fileRouter.get("/documents/:ownerAddress", getDocumentsByOwner);


export default fileRouter