import express from "express";

import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import * as path from "path";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/raw");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

export const fileFilterBrand = (req, file, cb) => {
  const allowedFileTypes = ["image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileFilterImg = (req, file, cb) => {
  const allowedFileTypes = [
    "image/png",
    "image/jpg",
    "image/webp",
    "image/jpg",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadBrand = multer({
  storage: storage,
  fileFilterBrand,
  limits: { fieldSize: 500 * 1024 * 1024 },
});
export const uploadProduct = multer({
  storage: storage,
  fileFilterImg,
  limits: { fieldSize: 500 * 1024 * 1024 },
});
export const uploadFavorites = multer({
  storage: storage,
  fileFilterImg,
  limits: { fieldSize: 500 * 1024 * 1024 },
});
