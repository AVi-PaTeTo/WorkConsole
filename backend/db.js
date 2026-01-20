import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log('Connected to the database:', conn.connection.host)
    } catch (err) {
        console.log('failed to connect:',err)
        process.exit(1)
    }
}

export default connectDB