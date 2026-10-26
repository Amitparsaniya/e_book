const mongoose =require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
    },

    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
         type:String,
        required:true
    },
    category:{
        type:String,
    },
    staus:{
        type:String,
        enum:['draft','published'],
        default:'draft'
    }
},{
    timestamps:true
})

const book = mongoose.model("Book",bookSchema)

module.exports=book