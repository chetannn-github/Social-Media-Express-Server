import mongoose from "mongoose";
import "dotenv/config"

export const connectToMongoDB = ()=>{
    main().catch(err => console.log(err));
}


async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to mongodb!!...")

  
}