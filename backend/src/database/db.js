import mongoose from "mongoose";

export const database  = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URL)
  } catch (error) {
    console.log("Something wrong while connecting with DB : ",error)
  }
}