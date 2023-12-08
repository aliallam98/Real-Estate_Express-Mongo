import express from 'express'
import { config } from 'dotenv';
const app = express()
config()



app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Is Listening On Port : ${process.env.PORT}`);
})