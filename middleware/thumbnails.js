import sharp from "sharp";

export const generateMini = async (end, size, image) => {
  console.log(image);
  await sharp(`img/raw/${image}`)
    .withMetadata()
    .resize({
      fit: sharp.fit.contain,
      height: 5,
    })
    .toFile(`img/mini/${image}`);
  await sharp(`img/raw/${image}`)
    .withMetadata()
    .resize({
      fit: sharp.fit.contain,
      height: size,
    })
    .toFile(`img/${end}/${image}`);
  return "Finished!";
};
