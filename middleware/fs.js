import fs from "fs";

export const deleteImages = (folder, images) => {
  images.forEach((image) => {
    const filename = image.filename;
    fs.unlink(`./img/${folder}/${filename}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};
