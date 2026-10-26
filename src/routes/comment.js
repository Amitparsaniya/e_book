const expess =require("express")
const {validate,tokenValidation} = require("../utils/validation")
const { commentSchema } = require("../validation/comment")
const { addComment } = require("../controller/comment")

const route = expess.Router()

// create user commment route
// note : not working properly
// route.post("/add/:id",tokenValidation,validate(commentSchema),addComment)


module.exports=route