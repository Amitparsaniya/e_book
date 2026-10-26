const mongoose =require("mongoose")

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("db is connected sucessfully")
}).catch((error)=>{
    console.log("error occured in databse connection",error)

})