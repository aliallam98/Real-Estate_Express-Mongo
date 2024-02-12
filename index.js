import express from 'express'
import { config } from 'dotenv';
import bootstrap from './src/index.router.js';
const app = express()
config()

bootstrap(app,express)


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Is Listening On Port : ${process.env.PORT}`);
})