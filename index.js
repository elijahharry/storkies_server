import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import * as path from "path";

const app = express();
dotenv.config();

import productRoutes from "./routes/products.js";
import brandRoutes from "./routes/brands.js";
import favoritesRoutes from "./routes/favorites.js";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const __dirname = path.resolve(path.dirname(""));

app.use("/img", express.static(__dirname + "/img"));
app.use("/brands", brandRoutes);
app.use("/products", productRoutes);
app.use("/fav", favoritesRoutes);

const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
