import connectDB from "./db/database.js"
import app from "./app.js";

connectDB()

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
});
  

