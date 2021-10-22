import mongoose from "mongoose";

const favoritesSchema = mongoose.Schema({
  images: Array,
  last_updated: { type: Date, default: new Date() },
});

const FavoritesModel = mongoose.model("FavoritesModel", favoritesSchema);

export default FavoritesModel;
