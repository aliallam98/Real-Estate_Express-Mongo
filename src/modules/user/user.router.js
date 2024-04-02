import { Router } from "express";
import * as userControllers from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.get("/listings", auth(), userControllers.getUserListings);
router.get("/favorites", auth(), userControllers.getUserFavorites);
router.put("/", auth(), userControllers.updateUser);

export default router;
