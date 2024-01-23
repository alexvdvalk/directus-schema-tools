import fs from "fs";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

export const writeToFile = (fileName: string, contents: Object) => {
  const outputPath = path.join(__dirname, "../../out");
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  const collectionsPath = path.join(outputPath, fileName);
  fs.writeFileSync(collectionsPath, JSON.stringify(contents, null, 2));
};

export const readFromFile = (fileName: string) => {
  const outputPath = path.join(__dirname, "../../out");
  const collectionsPath = path.join(outputPath, fileName);
  return JSON.parse(fs.readFileSync(collectionsPath, "utf8"));
};
export const clearFolder = () => {
  const outputPath = path.join(__dirname, "../../out");
  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true });
  }
};
