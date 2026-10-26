const expess =require("express")
require("dotenv").config()
require("./src/db/db")
const userRoute = require("./src/routes/user")
const bookRoute = require("./src/routes/book")
const commentRoute =require("./src/routes/comment")

const app =expess()

app.use(expess.json())

// user routes
app.use("/api/user",userRoute)
// book routes
app.use("/api/book",bookRoute)
// comment routes
app.use("/api/comment",commentRoute)



app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})