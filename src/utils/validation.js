const jwt =require("jsonwebtoken")

const validate =(schemas)=>{
    return (req,res,next)=>{

        for(let [key,schema]of Object.entries(schemas)){
            if(schema && req[key]){
                const {error}= schema.validate(req[key])
                if(error){
                    return res.status(400).json({message:error.details[0].message})
                    return error.details[0].message
                }
            }
        }
        next()
        }
}

const tokenValidation =async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1]
         console.log(token)
        if(!token){
            return res.status(400).json({
                message:"please provide valide token"
             })
        }

        const userData = await jwt.verify(token,process.env.SECRET_KEY)
                 console.log(userData)

       req.user =userData
       next()


    }catch(e){
        console.log(e)

    }
}

module.exports ={validate,tokenValidation}
