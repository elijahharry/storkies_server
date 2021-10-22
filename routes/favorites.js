import express from "express";
import { addFavorites, getFavorites } from "../controllers/favorites.js";
import { uploadFavorites } from "../middleware/multer.js";
import authorizeAccessToken from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authorizeAccessToken,
  uploadFavorites.array("images", 300),
  addFavorites
);
router.get("/fetch", getFavorites);

export default router;
