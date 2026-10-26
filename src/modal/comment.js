const mongoose =require("mongoose")

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true    
    },

    bookId:{
        type:mongoose.Types.ObjectId,
        ref:"Book",
        required:true
    },
    comment:{
         type:String,
        required:true
    },
    rating:{
        type:Number
    },
},{
    timestamps:true
})

const comment = mongoose.model("Comment",commentSchema)

module.exports=comment