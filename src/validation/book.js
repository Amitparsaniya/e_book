const joi =require("joi")

const createBookSchema = {
    body: joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        category:joi.string().optional(),
    })
}

const updateBookSchema = {
    params: joi.object({
        id:joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
        
    }),
    body: joi.object({
        title:joi.string().optional(),
        description:joi.string().optional(),
        category:joi.string().optional(),
    })

}

const BookListByAuthorSchema = {
    params: joi.object({
        id:joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
        
    }),
    query: joi.object({
        page:joi.number().integer().min(1).optional(),
        limit:joi.number().integer().min(1).optional()
    })

}

const deleteBookSchema ={
    params: joi.object({
        id:joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
        
    }),
}

const publishBookSchema ={
    params: joi.object({
        id:joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
        
    }),
}

module.exports={
    createBookSchema,
    updateBookSchema,
    BookListByAuthorSchema,
    deleteBookSchema,
    publishBookSchema
}
