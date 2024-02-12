import cors from 'cors'
import authRouter from "../src/modules/auth/auth.router.js"
import userRouter from "../src/modules/user/user.router.js"
import categoryRouter from "../src/modules/category/category.router.js"
import listingRouter from "../src/modules/listing/listing.router.js"
import connectDB from '../DB/connection.js'
import cookieParser from "cookie-parser"
import { globalErrorHandling } from './utils/errorHandling.js'



 const bootstrap = (app,express)=>{
    app.use(cors(
        {
            origin:'http://localhost:5173', 
            credentials:true,  
        }
    ))
    app.use(express.json())
    app.use(cookieParser());


    app.use("/api/auth",authRouter)
    app.use("/api/user",userRouter)
    app.use("/api/category",categoryRouter)
    app.use("/api/listing",listingRouter)


    //Not Found Routes
    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Please Check Url Or Method")
    })


    //G-Err Handler
    app.use(globalErrorHandling)

    connectDB()
}


export default bootstrap