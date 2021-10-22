import mongoose from "mongoose";
import FavoritesModel from "../models/favorites.js";
import { deleteImages } from "../middleware/fs.js";
import { generateMini } from "../middleware/thumbnails.js";
import datauri from "datauri";

export const getFavorites = async (req, res) => {
  try {
    const favorites = await FavoritesModel.find();
    res.status(200).json(favorites[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addFavorites = async (req, res) => {
  const old = JSON.parse(req.body.old);
  let images = [];
  if (!mongoose.Types.ObjectId.isValid(old._id)) {
    return res.status(404).send("Having issues removing old favorites.");
  } else {
    req.files.map((img) => {
      images.push(
        new Promise((resolve, reject) => {
          generateMini("fav", 1800, img.filename)
            .then(() => {
              datauri(`img/mini/${img.filename}`)
                .then((blur) =>
                  resolve({
                    original: img.originalname,
                    filename: img.filename,
                    folder: "img/fav",
                    blur: blur,
                  })
                )
                .catch((e) => {
                  console.log(e);
                  reject();
                });
            })
            .catch((e) => {
              console.log(e + " here");
              reject();
            });
        })
      );
    });
    Promise.all(images)
      .then((i) => {
        const newFavorites = new FavoritesModel({
          images: i,
          last_updated: new Date(),
        });
        newFavorites
          .save()
          .then(async () => {
            await FavoritesModel.findByIdAndRemove(old._id);
            deleteImages("mini", i);
            deleteImages("raw", i);
            deleteImages("fav", old.images);
            res
              .status(201)
              .json({ message: "Favorites uploaded successfully." });
          })
          .catch((e) => {
            res.status(409).json({
              message:
                "Something went wrong trying to save this to our database.",
            });
          });
      })
      .catch((e) => {
        res
          .status(400)
          .json({ message: "Something went wrong while saving images." });
      });
  }
};
