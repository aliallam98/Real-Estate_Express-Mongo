import userModel from "../../DB/models/User.model.js";
import { ErrorClass } from "../utils/ErrorClass.js";
import { verifyToken } from "../utils/generateAndVerfiyToken.js";

export const auth = (roles = []) => {
  return async (req, res, next) => {
    try {

      const { realEstateJwt:token } = req.cookies
      
      if (!token) {
        return next(new ErrorClass("Jwt Is Required", 401));
      }
      
      const decoded = verifyToken({ token });
      if (!decoded?.id) {
        return next(new ErrorClass("Invalid Payload Data", 401));
      }

      const user= await userModel.findById(decoded.id);
      if (!user) {
        return next(new ErrorClass("Not Registered Account", 404));
      }

      req.user = user;
      next();



      // const { authorization } = req.headers;
      // if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      //   return next(new ErrorClass("Authorization Is Required"));
      // }
      // const token = authorization.split(process.env.BEARER_KEY)[1];
      // if (!token) {
      //   return next(new ErrorClass("token Is Required"));
      // }
      // const decoded = verifyToken({ token });
      // if (!decoded?.id) {
      //   return next(new ErrorClass("Invaild Payload Data"));
      // }

      // const user = await userModel.findById(decoded.id);
      // if (!user) {
      //   return next(new ErrorClass("Not Registered Account"));
      // }
      // if (!roles.includes(user.role)) {
      //   return next(new ErrorClass("you arre Unauthorized ", 401));
      // }
      // req.user = user;
      // next();
    } catch (error) {
      return res.json({ message: "Catch error", err: error?.message });
    }
  };
};

export const roles = {
  admin: "Admin",
  user: "User",
};
