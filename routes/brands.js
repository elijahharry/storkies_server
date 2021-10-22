import express from "express";
import { addBrand, getBrands, deleteBrand } from "../controllers/brands.js";
import { uploadBrand } from "../middleware/multer.js";
import authorizeAccessToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", authorizeAccessToken, uploadBrand.single("logo"), addBrand);
router.post("/delete", authorizeAccessToken, deleteBrand);
router.get("/fetch", getBrands);

export default router;
