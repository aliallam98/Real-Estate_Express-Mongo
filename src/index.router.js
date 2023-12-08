


 const bootstrap = (app,express)=>{
    app.use(express.json())
    app.use(cors())



    app.all('*', (req, res, next) => {
        res.send("In-valid Routing Please Check Url Or Method")
    })


    app.use((error,req,res,next)=>{
        return res.status(error.status || 400).json({ message: error.message, stack : error.stack })
    })
}


export default bootstrap