import mongoose from "mongoose"

export const connectDB = async (DATABASE_URL) =>{
 try{
    const db_option = {
        dbName :"jwtAuth"
    }
    await mongoose.connect(DATABASE_URL,db_option);
    console.log("DB connected successfully");
 }  catch (error) {
    console.log(error);
 }
}