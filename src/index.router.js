import cors from 'cors'
import authRouter from "../src/modules/auth/auth.router.js"
import userRouter from "../src/modules/user/user.router.js"
import categoryRouter from "../src/modules/category/category.router.js"
import listingRouter from "../src/modules/listing/listing.router.js"


 const bootstrap = (app,express)=>{
    app.use(express.json())
    app.use(cors())

    app.use("/api/auth",authRouter)
    app.use("/api/user",userRouter)
    app.use("/api/category",categoryRouter)
    app.use("/api/listing",listingRouter)


    //Not Found Routes
    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Please Check Url Or Method")
    })


    //G-Err Handler
    app.use((error,req,res,next)=>{
        return res.status(error.status || 400).json({ message: error.message, stack : error.stack })
    })
}


export default bootstrap