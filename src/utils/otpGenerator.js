import otpGenerator from "otp-generator";
import moment from 'moment';


//nu : Numbers of OTP That We Want , Mins : Set Expire Date Date now + mins
export const OTPGenerator = (nu,mins)=>{
    return {
        OTP :  otpGenerator.generate(nu,{
            lowerCaseAlphabets:false,
            specialChars:false,
            upperCaseAlphabets:false
        }),
        expireDate : moment().add(mins,"minute").format('YYYY-MM-DD HH:mm:ss')
    }
}