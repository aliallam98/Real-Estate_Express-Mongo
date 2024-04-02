import { Router } from "express";
const router = Router();
import * as listingController from "./listing.controller.js";
import * as listingValidators from "./listing.validation.js";
import { validation } from "../../middleware/validation.js";
import { fileValidation, fileUpload } from "../../utils/multer.js";
import { auth } from "../../middleware/auth.js";

router.get("/", listingController.getAllListings);
router.get("/:id", listingController.getListingById);
router.post(
  "/",
  auth(),
  fileUpload(fileValidation.image).array("images", 6),
  validation(listingValidators.createListing),
  listingController.createNewListing
);
router.put(
  "/:id",
  fileUpload(fileValidation.image).array("images", 6),
  validation(listingValidators.updateListing),
  listingController.updateListing
);
router.delete("/:id", listingController.deleteListingById);

router.patch("/favorites/clear", auth(),listingController.clearFavorites);
router.patch(
  "/favorites/:id",
  auth(),
  listingController.addAndRemoveFromFavorites
);

export default router;
