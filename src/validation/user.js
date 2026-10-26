const joi =require("joi")

const userCreateSchema = {
    body: joi.object({
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().min(3).max(15).required(),
        role:joi.string().valid("reader","author")

    })
}

const userLoginSchema ={
    body: joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(3).max(15).required(),
    })
}

module.exports = {userCreateSchema,userLoginSchema}