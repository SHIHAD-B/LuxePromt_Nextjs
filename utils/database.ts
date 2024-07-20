import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('DataBase is alredy connected')
        return
    }
    try {
        await mongoose.connect(String(process.env.MONGODB_URI).trim())
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
}