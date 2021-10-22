import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
  title: String,
  slug: String,
  bio: String,
  color: String,
  logo: Object,
});

const BrandModel = mongoose.model("BrandModel", brandSchema);

export default BrandModel;
