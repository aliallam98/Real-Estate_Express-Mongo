import listingModel from "../../../DB/models/listing.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "../../utils/cloudinary.js";
import ApiFeatures from "../../utils/apiFeatures.js";

export const getAllListings = async (req, res, next) => {
  const { query, page, skip, limit, sort, fields, order } = ApiFeatures(
    req.query
  ); // query(searchTerm,filtering), page, skip, limit,fields
  // console.log("query", query);
  // console.log("page", page);
  // console.log("limit", limit);
  // console.log(sort, order);
  const totalDocuments = await listingModel.countDocuments(query);
  const listings = await listingModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [sort]: order })
    .select(fields);

  const totalPages = Math.ceil(totalDocuments / limit);

  return res
    .status(200)
    .json({ success: true, results: { totalDocuments, listings, totalPages } });
};
export const getListingById = async (req, res, next) => {
  const { id } = req.params;

  const isListingExist = await listingModel.findById(id);
  if (!isListingExist)
    return next(new ErrorClass("Cannot Find This Document", 404));

  return res.status(200).json({ success: true, isListingExist });
};

export const createNewListing = async (req, res, next) => {
  try {
    if (req.files) {
      const images = [];
      for (const file of req.files) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          { folder: `Real-Estate/${req.body.title.split(" ").slice(1,2)}-${uuidv4()}` }
        );
        images.push({ secure_url, public_id });
      }
      req.body.images = images;
    }

    if (req.body.discount) {
      req.body.price =
        req.body.price - (req.body.discount * req.body.price) / 100;
    }
    req.body.furnished
      ? (req.body.furnished = true)
      : (req.body.furnished = false);

    // req.body.createdBy = req.user._id
    const listing = await listingModel.create(req.body);
    return res.status(201).json({ success: true, results:listing });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(req.files);
    const isListingExist = await listingModel.findById(id);
    if (!isListingExist)
      return next(new ErrorClass("Cannot Find This Document", 404));

    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    if (req.files.length) {
      const images = [];
      for (const file of req.files) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          { folder: `Real-Estate/${req.body.name}-${uuidv4()}` }
        );
        images.push({ secure_url, public_id });
      }
      req.body.images = images;
      if (isListingExist.images) {
        for (const image of images) {
          await cloudinary.uploader.destroy(public_id);
        }
      }
    }

    if (req.body.discount) {
      req.body.price =
        req.body.price - (req.body.discount * req.body.price) / 100;
    }
    req.body.furnished
      ? (req.body.furnished = true)
      : (req.body.furnished = false);

    // req.body.createdBy = req.user._id
    const listing = await listingModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ success: true, listing });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteListingById = async (req, res, next) => {
  const { id } = req.params;

  const isExist = await listingModel.findById(id);
  if (!isExist) return next(new ErrorClass("Cannot Find This Document", 404));

  // if (isExist.createdBy.toString() !== req.user._id.toString())
  //   return next(
  //     new ErrorClass("You Are Not Authorized To Delete This Document", 401)
  //   );

  const listing = await listingModel.findByIdAndDelete(id);
  if (!listing) return next(new ErrorClass("Cannot Find This Document", 404));

  return res.status(204).json();
};
