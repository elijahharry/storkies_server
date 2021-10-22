import sharp from "sharp";

export const generateMini = async (end, size, image) => {
  await sharp(`img/raw/${image}`)
    .withMetadata()
    .resize({
      fit: sharp.fit.contain,
      height: size,
    })
    .toFile(`img/${end}/${image}`);
  return "Finished!";
};
