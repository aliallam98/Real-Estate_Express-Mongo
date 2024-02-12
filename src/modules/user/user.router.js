import { Router } from "express";
import * as userControllers from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

router.put("/", auth(), userControllers.updateUser);

export default router;
