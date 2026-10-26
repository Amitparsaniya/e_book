const book = require("../modal/book")

const createBook = async(req,res)=>{
    try {
        const {title,author,description,category} = req.body

        const userData = req.user
        console.log(/usertoken/,userData)

        // author validation for book creation
        if(userData.role !=='author'){
            return res.status(400).json(  {message:"you are not able to create or puvlished book"})
        }
        //book create
       const bookData= await book.create({
           title,
           author:userData.id,
           description,
           category
        })

        return res.status(201).json(
            {message:"book created successfully and saved as draft mode, you can published book ,if u want",
             data:{
                title:bookData.title,
                author:bookData.description
                 }  
             })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"some thing went wrong during creating book"},{data:error.message})
    }
}


const updateBookById = async (req,res)=>{
    try {
        const {id} =req.params
        const {title,description,category} = req.body

          const userData = req.user
        console.log(/usertoken/,userData)

        // author validation for book updation
        if(userData.role !=='author'){
            return res.status(400).json(  {message:"you are not able to update book"})
        }

        //check book exist
        const bookExist = await book.findOne({_id:id})

        if(!bookExist){
            return res.status(400).json(  {message:"book is not exist with this book id"})
        }
        //allow only book autohr for an update book
        if(String(bookExist.author)!==userData.id){
            return res.status(400).json(  {message:"you are not able to update book beacuse you are not author of this book"})
        }

        let update={}
        if(title){
            update.title=title
        }
        if(description){
            update.description=description
        }
        if(category){
            update.category=category
        }
        // update book
        await book.findByIdAndUpdate(bookExist._id,update)

         return res.status(200).json({message:"book updated successfully" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"some thing went wrong during updating book"},{data:error.message})
    }
}

const listBookByAutor = async(req,res)=>{
    try{
    const {id} =req.params
    let {page,limit} =req.query

     if(!page){
        page=1
     }
     if(!limit){
        limit=10
     }

    const offset =(page-1)*limit

    // const filterData={
    //     author:id,
    //     status:"draft"
    // }

    const bookList = await book.find({author:id}).sort({createdAt:-1}).skip(offset).limit(limit)
    let bookData =[]

    if(bookList.length>0){
           bookData = bookList.filter((book)=>{
            return book.staus==='published'
        })
    }

    return res.status(200).json({message:"book listed successfully",data:bookData})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"some thing went wrong during listing book",data:error.message})
    }

}

const deleteBook=async (req,res)=>{
    try{
         const {id} =req.params

          const userData = req.user

        // author validation for book updation
        if(userData.role !=='author'){
            return res.status(400).json(  {message:"you are not able to delete book"})
        }

        //check book exist
        const bookExist = await book.findOne({_id:id})

        if(!bookExist){
            return res.status(400).json(  {message:"book is not exist with this book id"})
        }
        //allow only book autohr for an update book
        if(String(bookExist.author)!==userData.id){
            return res.status(400).json(  {message:"you are not able to update book beacuse you are not author of this book"})
        }

        await book.findByIdAndDelete(id)

            return res.status(200).json({message:"book deleted successfully"})

    }catch(error){
          console.log(error)
        return res.status(500).json({message:"some thing went wrong during delete book",data:error.message})
    }
}

const publishedBook = async (req,res)=>{
    try{
        const {id} =req.params

          const userData = req.user
        console.log(/usertoken/,userData)

        // author validation for book updation
        if(userData.role !=='author'){
            return res.status(400).json(  {message:"you are not able to published book"})
        }

        //check book exist
        const bookExist = await book.findOne({_id:id})

        if(!bookExist){
            return res.status(400).json(  {message:"book is not exist with this book id"})
        }

        if(bookExist.staus==='published'){
           return res.status(400).json(  {message:"book is already published"})

        }
        //allow only book autohr for an update book
        if(String(bookExist.author)!==userData.id){
            return res.status(400).json(  {message:"you are not able to update book beacuse you are not author of this book"})
        }

        bookExist.staus='published'
        await bookExist.save()

         return res.status(200).json({message:"book published successfully"})

    }catch(error){
          console.log(error)
        return res.status(500).json({message:"some thing went wrong during delete book",data:error.message})
    }
}

module.exports ={createBook,updateBookById,listBookByAutor,deleteBook,publishedBook}