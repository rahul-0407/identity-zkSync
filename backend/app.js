import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import fileRouter from "./routes/files.js"
import verificationRoutes from './routes/verification.js';
import {errorMiddleware} from "./middlewares/error.js"



const app = express();

const allowedOrigins = ['http://localhost:5173','https://identity-zk-sync.vercel.app/']

app.use(cors({
    origin: function (origin,callback){
        if(!origin) return callback(null, true);

        if(allowedOrigins.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error ("Not allowed by CORS"));
        }
    },
    credentials: true,  // Enables Access-Control-Allow-Credentials for cookie support
}));


app.use("/api/auth/v1",fileRouter)
app.use('/api/verifications', verificationRoutes);



app.get("/", (req, res) => {
  res.send("Working");
});



app.use(errorMiddleware);


export default app;