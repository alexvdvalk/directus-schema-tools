import { RestClient } from "@directus/sdk";
import loadRelations from "./load-relations.js";
import { loadCollections } from "./load-collections.js";

export default async (client: RestClient<any>) => {
  await loadCollections(client);
  console.log("Loaded Collections");
  await loadRelations(client);
  console.log("Loaded relations");
};
