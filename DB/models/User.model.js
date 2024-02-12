import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: String,
    profileImage: {
      downloadURL: String,
      fileName: String,
    },
    confirmEmail: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, default: "User", enum: ["User", "Admin"] },
    OTP: { otp: String, expireDate: Date },
    OTPNumber: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.User || model("User", userSchema);

export default userModel;
