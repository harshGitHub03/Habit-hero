const mongoose=require("mongoose")

mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
.then(()=>console.log("Connection successfull to mongodb."))
.catch((e)=>console.log("Error connecting mongodb.",e))