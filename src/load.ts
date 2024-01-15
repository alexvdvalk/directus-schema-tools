import { loadCollections } from "./lib/load/load-collections";
import loadRelations from "./lib/load/load-relations";

const start = async () => {
  await loadCollections();
  await loadRelations();
};

start();
