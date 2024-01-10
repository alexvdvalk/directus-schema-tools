import extractCollections from "./lib/extract/extract-collections";
import extractFields from "./lib/extract/extract-fields";
import { clearFolder } from "./lib/file-interactions";

clearFolder();
extractCollections().then(() => {
  extractFields().then(() => {
    console.log("Extraction complete");
    process.exit(0);
  });
});
