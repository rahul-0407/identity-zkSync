import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"SSI"
    })
    .then((c)=>console.log(`Database connected with ${c.connection.host}`))
    .catch((err)=> console.log(err))
}

export default connectDB