const user = require("../modal/user")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")

const createUser = async(req,res)=>{
    try {
        const {name,email,password,role} = req.body

        //check user exist or not
        const userExist = await user.findOne({email})
        if(userExist){
            return res.status(400).json({message:"user already exist"})
        }
        
        //hashing password
        const hashPassword = await bcrypt.hash(password,10)

        //user create
       const userData= await user.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        })

        return res.status(201).json(
            {message:"user created successfully",
             data:{
                name:userData.name,
                email:userData.email
                 }  
             })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"some thing went wrong during creating user"},{data:error.message})
    }
}

const userLogin = async(req,res)=>{
    try {
        const {email,password}=req.body
        
        //check user exist or not
        const userExist = await user.findOne({email})
        if(!userExist){
            return res.status(400).json({message:"user already exist"})
        }

        //password comparing
        const isValidPassword = await bcrypt.hash(password,userExist.password)

        if(!isValidPassword){
             return res.status(400).json({message:"emai or password is invalid"})
        }
        //prepare data for token 
        const userData ={
             id:userExist._id,
             name:userExist.name,
             email:userExist.email,
             role: userExist.role
        }
        //genrate token
        const  token = await jwt.sign(userData,process.env.SECRET_KEY)

        return res.status(200).json(
            {message:"user login successfully",     
             data:{token}
             })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"some thing went wrong during login user"},{data:error.message})

        
    }
}

module.exports= {
    createUser,
    userLogin
}