import extractCollections from "./lib/extract/extract-collections";
import extractFields from "./lib/extract/extract-fields";
import extractRelations from "./lib/extract/extract-relations";
import { clearFolder } from "./lib/file-interactions";

const start = async () => {
  clearFolder();
  await extractCollections();
  await extractFields();
  await extractRelations();
  console.log("Extraction complete");
  process.exit(0);
};

start();
