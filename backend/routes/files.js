import express from "express";
import {uploadAndRegister, getDocumentMetadata, getDocumentsByOwner, deleteDocument} from "../controllers/files.js"
import upload from "../middlewares/multer.js"
import { authenticateUser } from '../middlewares/auth.js';

const fileRouter = express.Router();

fileRouter.post("/uploadFile",authenticateUser,upload.fields([{name:'image0',maxCount:1}]),uploadAndRegister)
fileRouter.get("/deleteDocument/:hash",deleteDocument)
fileRouter.get("/metadataByHash/:hash",getDocumentMetadata)
fileRouter.get("/documents/:ownerAddress",authenticateUser, getDocumentsByOwner);


export default fileRouter