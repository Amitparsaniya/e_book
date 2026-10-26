const expess =require("express")
const {validate, tokenValidation} = require("../utils/validation")
const { createBook, updateBookById, listBookByAutor, deleteBook, publishedBook } = require("../controller/book")
const { createBookSchema, updateBookSchema, BookListByAuthorSchema, deleteBookSchema, publishBookSchema } = require("../validation/book")

const route = expess.Router()

//  create book route
route.post("/create",tokenValidation,validate(createBookSchema),createBook)

// update book route
route.patch("/update/:id",tokenValidation,validate(updateBookSchema),updateBookById)

//get list of published book route
route.get("/list/:id",tokenValidation,validate(BookListByAuthorSchema),listBookByAutor)

// delete book route
route.delete("/delete/:id",tokenValidation,validate(deleteBookSchema),deleteBook)

// published book route
route.patch("/publish/:id",tokenValidation,validate(publishBookSchema),publishedBook)






module.exports=route