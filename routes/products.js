import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../controllers/products.js";
import { uploadProduct } from "../middleware/multer.js";
import authorizeAccessToken from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authorizeAccessToken,
  uploadProduct.array("images", 20),
  addProduct
);
router.post("/delete", authorizeAccessToken, deleteProduct);
router.get("/fetch", getProducts);

export default router;
