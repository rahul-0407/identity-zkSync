import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import fileRouter from "./routes/files.js"
import verificationRoutes from './routes/verification.js';
import {errorMiddleware} from "./middlewares/error.js"



const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  // Enables Access-Control-Allow-Credentials for cookie support
}));


app.use("/api/auth/v1",fileRouter)
app.use('/api/verifications', verificationRoutes);



app.use(errorMiddleware);


export default app;