import { getPlaiceholder } from "plaiceholder";

export default async function generatePlaceholder(folder, filename) {
  const { base64 } = await getPlaiceholder(
    `${process.env.SERVER_URL}/img/${folder}/${filename}`
  );
  return base64;
}
