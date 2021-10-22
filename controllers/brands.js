import mongoose from "mongoose";
import BrandModel from "../models/brand.js";
import { deleteImages } from "../middleware/fs.js";
import { generateMini } from "../middleware/thumbnails.js";
import datauri from "datauri";

export const getBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addBrand = async (req, res) => {
  const thumbnail = await generateMini("brands", 750, req.file.filename);
  const imgUri = await datauri(`img/mini/${req.file.filename}`);
  const newBrand = new BrandModel({
    title: req.body.title,
    slug: req.body.slug,
    bio: req.body.bio,
    color: req.body.color,
    logo: {
      original: req.file.originalname,
      filename: req.file.filename,
      folder: req.file.destination,
      blur: imgUri,
    },
  });
  try {
    await newBrand.save();
    deleteImages("mini", [req.file]);
    res.status(201).json({ message: "Brand successfully added." });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  const { title, id, logo } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No brand with that ID.");
  } else {
    // deleteImages("brands", [logo]);
    await BrandModel.findByIdAndRemove(id);
    res.status(200).json({ message: `${title} removed successfully.` });
  }
};
