import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  brand: Object,
  type: String,
  desc: String,
  images: Array,
  sizes: Array,
  source: String,
  genetics: String,
  thc: {
    type: String,
    default: 0,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;
