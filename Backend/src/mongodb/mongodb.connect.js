const mongoose=require("mongoose")

mongoose.connect(`${process.env.MONGO_URI}`)
.then(()=>console.log("Connection successfull to mongodb."))
.catch((e)=>console.log("Error connecting mongodb.",e))