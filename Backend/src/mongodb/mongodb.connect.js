const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/Habit-Hero")
.then(()=>console.log("Connection successfull to mongodb."))
.catch(()=>console.log("Error connecting mongodb."))