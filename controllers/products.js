import mongoose from "mongoose";
import ProductModel from "../models/product.js";
import { deleteImages } from "../middleware/fs.js";
import { generateMini } from "../middleware/thumbnails.js";
import datauri from "datauri";

export const getProducts = async (req, res) => {
  try {
    const allStrains = await ProductModel.find();
    res.status(200).json(allStrains);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  res.status(200);
  let images = [];
  req.files.map((img) => {
    images.push(
      new Promise((resolve, reject) => {
        generateMini("products", 1500, img.filename)
          .then(() => {
            datauri(`img/mini/${img.filename}`)
              .then((blur) =>
                resolve({
                  original: img.originalname,
                  filename: img.filename,
                  folder: "img/products",
                  blur: blur,
                })
              )
              .catch((e) => {
                console.log(e);
                reject();
              });
          })
          .catch((e) => {
            console.log(e);
            reject();
          });
      })
    );
  });
  Promise.all(images)
    .then((i) => {
      const newProduct = new ProductModel({
        title: req.body.title,
        brand: JSON.parse(req.body.brand),
        type: req.body.type,
        desc: req.body.desc,
        images: i,
        sizes: JSON.parse(req.body.sizes),
        thc: req.body.thc,
        source: req.body.source,
        genetics: req.body.genetics,
      });
      newProduct
        .save()
        .then(() => {
          deleteImages("mini", i);
          deleteImages("raw", i);
          res.status(201).json({ message: "Saved successfully." });
        })
        .catch((e) => {
          console.log(e);
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
};

export const deleteProduct = async (req, res) => {
  const { title, id, images } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No product with that ID.");
  } else {
    deleteImages("products", images);
    await ProductModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Strain deleted successfully." });
  }
};
