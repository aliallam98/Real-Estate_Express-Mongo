import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createListing = {
  body: joi.object().required().keys({  
    title:joi.string().required(),
    description:joi.string().required(),
    // category:joi.string().required(),
    address:joi.string().required(),
    price:joi.string().required(),
    // discount:joi.string().required(),
    bedrooms:joi.string().required(),
    bathrooms:joi.string().required(),
    furnished:joi.string().required(),
    parking:joi.string().required(),
    purpose:joi.string().required(),

  }),
  params: joi.object().required().keys({}),
  query: joi.object().required().keys({}),
  files: joi.array().items(generalFields.file)

};
export const updateListing = {};
export const deleteListing = {};

export const getListingById = {};
