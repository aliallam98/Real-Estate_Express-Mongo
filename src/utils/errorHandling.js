import { ErrorClass } from "./ErrorClass.js";


export const asyncHandler =  (fn)=>{
  return (req,res,next)=>{
    return fn(req,res,next).catch((error)=>{
      return next(new ErrorClass(error.message, error.stack || 500))
    })
  }
}


export const globalErrorHandling = (error, req, res, next) => {
  return res
    .status(error.status || 400)
    .json({ success: false, message: error.message , stack : error.stack });
};
