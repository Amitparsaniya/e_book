const expess =require("express")
const { createUser, userLogin } = require("../controller/user")
const {validate} = require("../utils/validation")
const { userCreateSchema, userLoginSchema } = require("../validation/user")

const route = expess.Router()

// create user route
route.post("/create",validate(userCreateSchema),createUser)

// login user route
route.post("/login",validate(userLoginSchema),userLogin)


module.exports=route