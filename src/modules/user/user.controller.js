import userModel from "../../../DB/models/User.model.js";
import listingModel from "../../../DB/models/listing.model.js";
import { hash } from "../../utils/hashAndCompare.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = hash({ plainText: req.body.password });
    }

    const userToUpdate = await userModel.findByIdAndUpdate(
      req.user._id,
      { ...req.body },
      { new: true }
    );

    const { userName, profileImage, email } = userToUpdate;

    res
      .status(200)
      .json({ success: true, results: { userName, profileImage, email, } });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  const listings = await listingModel.find({ createdBy: req.user._id });

  return res.status(200).json({ success: true, results: listings });
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
