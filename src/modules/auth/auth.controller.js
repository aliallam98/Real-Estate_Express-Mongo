import userModel from "../../../DB/models/User.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { generateToken } from "../../utils/generateAndVerfiyToken.js";
import { compare, hash } from "../../utils/hashAndCompare.js";
import OTPGeneratorFn from "../../utils/otpGenerator.js";

export const signUp = async (req, res, next) => {
  let { email, password } = req.body;

  //Check Email > Must Be Unique
  const isEmailExist = await userModel.findOne({ email });
  if (isEmailExist)
    return next(new ErrorClass("This Email Is Already In Use", 409));

  //phone is optional in case user send it and encrypt it
  if (req.body.phone) {
    req.body.phone = CryptoJS.AES.encrypt(
      req.body.phone,
      process.env.CryptoJSKEY
    );
  }

  //Encrypt Password
  req.body.password = hash({ plainText: password });

  //Create OTP contains 5 nus and valid for 2mins
  const OTP = OTPGeneratorFn(5, 2);
  req.body.OTP = OTP;

  //Send OTP
  // const html = createHTML(OTP)
  // await emailSender({to:email,subject:"Email Confirmation" ,html})

  //Create User
  const user = await userModel.create(req.body);

  return res
    .status(201)
    .json({sucess:true, message: "You Account Has Been Created" });
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  //check Is Email Exist
  const isEmailExist = await userModel.findOne({ email });
  if (!isEmailExist)
    return next(new ErrorClass("Wrong Password Or Email", 401));

  //check Is Password Match
  const isPasswordMatch = compare({
    plainText: password,
    hashValue: isEmailExist.password,
  });

  if (!isPasswordMatch)
    return next(new ErrorClass("Wrong Password Or Email", 401));

  // Generate JWT Token
  const payload = {
    userName: isEmailExist.userName,
    email: isEmailExist.email,
    id: isEmailExist._id,
    profileImage: isEmailExist.profileImage,
  };
  const token = generateToken({ payload });

  // Save Re-Fresh Token In Cookies
  res.cookie("realEstateJwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // MM
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  // response

  return res.status(200).json({ message: "Logged In", payload });
};

export const logOut = async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged Out" });
};
