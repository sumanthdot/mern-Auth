import mongoose from 'mongoose'

const connectDB = async() => {
  ////s
    try {
            console.log("mongo_uri",process.env.MONGO_URI)
           const conn =  await mongoose.connect(process.env.MONGO_URI)
           console.log(`MongoDb Connected: ${conn.connection.host}`)
        }
        
        catch (error) {
            console.log("Error connection to MongoDB:",error.message)
            process.exit(1) // 1 is failure, 0 status is success
        }
  
}

export default connectDB;
