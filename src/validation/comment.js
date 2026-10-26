const joi =require("joi")
const commentSchema = {
    params: joi.object({
        id:joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
        
    }),
    body: joi.object({
        comment:joi.string().required().optional(),
        rating:joi.number().integer().min(1).max(5).optional()
    })

}

module.exports ={commentSchema}