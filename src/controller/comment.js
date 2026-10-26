const comment = require("../modal/comment")
const book =require("../modal/book")

//note :need to some chaneges on this controller so not working properly
const addComment =async (req,res)=>{
    try{
          const {id} =req.params
          const {comment,rating} = req.body
          const userData = req.user
        console.log(/usertoken/,userData)

        //check book exist
        const bookExist = await book.findOne({_id:id})

        if(!bookExist){
            return res.status(400).json({message:"book is not exist with this book id"})
        }

        const createComment = await comment.create({
            comment,
            rating,
            bookId:id,
            userId:userData.id
        })

        return res.status(201).json(
            {message:"comment  created successfully",
             data:{
                comment:createComment.comment,
                rating:createComment.rating
                 }  
             })

    }catch(error){
        console.log(error)
        return res.status(500).json({message:"some thing went wrong during creating comment"},{data:error.message})
    }
}

module.exports ={addComment}