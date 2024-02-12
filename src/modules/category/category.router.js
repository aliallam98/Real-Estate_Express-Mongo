import { Router } from "express";
const router = Router();
import * as categoryController from "./category.controller.js";
import * as categoryValidators from "./category.validation.js";
import { validation } from "../../middleware/validation.js";
import { fileValidation, fileUpload } from "../../utils/multer.js";

router.get("/", categoryController.getAllCategories);
router.get(
  "/:id",
  validation(categoryValidators.getCategoryById),
  validation(categoryValidators.getCategoryById),
  categoryController.getCategoryById
);
router.post(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(categoryValidators.createCategory),
  categoryController.createNewCategory
);
router.put(
  "/",
  fileUpload(fileValidation.image).single("image"),
  validation(categoryValidators.updateCategory),
  categoryController.updateCategory
);
router.delete(
  "/",
  validation(categoryValidators.deleteCategory),
  categoryController.deleteCategoryById
);

export default router;
