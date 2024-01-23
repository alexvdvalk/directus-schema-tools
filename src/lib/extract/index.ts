import { RestClient } from "@directus/sdk";
import extractCollections from "./extract-collections.js";
import extractFields from "./extract-fields.js";
import extractRelations from "./extract-relations.js";
import { clearFolder } from "../file-interactions.js";

export default async (client: RestClient<any>) => {
  clearFolder();
  await extractCollections(client);
  console.log("Extracted Collections");
  await extractFields(client);
  console.log("Extracted Fields");

  await extractRelations(client);
  console.log("Extracted Relations");
};
